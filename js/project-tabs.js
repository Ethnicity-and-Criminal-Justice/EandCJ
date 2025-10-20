/**
 * Project Tabs - Tabbed interface for project overviews
 */
(function() {
    'use strict';
    
    function initProjectTabs() {
        const tabButtons = document.querySelectorAll('.tab-list li[role="tab"]');
        const tabPanels = document.querySelectorAll('.tab-panel');
        const wrapper = document.querySelector('.tab-panels-wrapper');
        
        if (tabButtons.length === 0 || tabPanels.length === 0 || !wrapper) {
            return;
        }
        
        // Calculate tallest panel height once on load
        function setWrapperHeight() {
            let maxHeight = 0;
            
            // Measure each panel (they are all in the same grid area so we can measure them even when hidden)
            tabPanels.forEach(function(panel) {
                // Temporarily show to measure
                const wasActive = panel.classList.contains('active');
                panel.style.opacity = '1';
                panel.style.pointerEvents = 'auto';
                
                const height = panel.offsetHeight;
                if (height > maxHeight) {
                    maxHeight = height;
                }
                
                // Restore state
                if (!wasActive) {
                    panel.style.opacity = '0';
                    panel.style.pointerEvents = 'none';
                }
            });
            
            // Set wrapper height to tallest panel
            if (maxHeight > 0) {
                wrapper.style.minHeight = maxHeight + 'px';
            }
        }
        
        // Function to switch tabs with fade effect
        function switchTab(targetId) {
            // Hide all panels and remove active class
            tabPanels.forEach(function(panel) {
                panel.classList.remove('active');
                panel.style.opacity = '0';
                panel.style.pointerEvents = 'none';
            });
            
            // Show target panel and add active class
            const newPanel = document.getElementById(targetId);
            if (newPanel) {
                newPanel.classList.add('active');
                newPanel.style.opacity = '1';
                newPanel.style.pointerEvents = 'auto';
            }
            
            // Update tab button states
            tabButtons.forEach(function(btn) {
                btn.classList.remove('active');
                btn.setAttribute('aria-selected', 'false');
            });
            
            const activeButton = document.querySelector('.tab-list li[data-target="' + targetId + '"]');
            if (activeButton) {
                activeButton.classList.add('active');
                activeButton.setAttribute('aria-selected', 'true');
            }
        }
        
        // Add click handlers to tab buttons
        tabButtons.forEach(function(button) {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                // Don't do anything if this tab is already active
                if (this.classList.contains('active')) {
                    return;
                }
                const targetId = this.getAttribute('data-target');
                if (targetId) {
                    switchTab(targetId);
                }
            });
            
            // Add keyboard support
            button.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    // Don't do anything if this tab is already active
                    if (this.classList.contains('active')) {
                        return;
                    }
                    const targetId = this.getAttribute('data-target');
                    if (targetId) {
                        switchTab(targetId);
                    }
                }
            });
        });
        
        // Activate the first tab by default
        if (tabButtons.length > 0) {
            const firstButton = tabButtons[0];
            const firstTargetId = firstButton.getAttribute('data-target');
            if (firstTargetId) {
                const firstPanel = document.getElementById(firstTargetId);
                if (firstPanel) {
                    firstPanel.classList.add('active');
                    firstPanel.style.opacity = '1';
                    firstPanel.style.pointerEvents = 'auto';
                    firstButton.classList.add('active');
                    firstButton.setAttribute('aria-selected', 'true');
                }
            }
        }
        
        // Hide all other panels initially
        tabPanels.forEach(function(panel) {
            if (!panel.classList.contains('active')) {
                panel.style.opacity = '0';
                panel.style.pointerEvents = 'none';
            }
        });
        
        // Set wrapper height based on tallest panel (runs once on load)
        setTimeout(function() {
            setWrapperHeight();
        }, 100);
    }
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initProjectTabs);
    } else {
        initProjectTabs();
    }
})();
