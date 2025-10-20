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
            
            // Temporarily make all panels visible to measure heights
            tabPanels.forEach(function(panel) {
                panel.style.opacity = '1';
                panel.style.pointerEvents = 'auto';
            });
            
            // Measure after a brief moment to allow rendering
            setTimeout(function() {
                tabPanels.forEach(function(panel) {
                    const height = panel.offsetHeight;
                    if (height > maxHeight) {
                        maxHeight = height;
                    }
                });
                
                // Hide all panels except active one
                tabPanels.forEach(function(panel) {
                    if (!panel.classList.contains('active')) {
                        panel.style.opacity = '0';
                        panel.style.pointerEvents = 'none';
                    }
                });
                
                // Set wrapper height to tallest panel
                if (maxHeight > 0) {
                    wrapper.style.minHeight = maxHeight + 'px';
                }
            }, 50);
        }
        
        // Function to switch tabs with fade effect
        function switchTab(targetId) {
            // Remove active class from all panels
            tabPanels.forEach(function(panel) {
                panel.classList.remove('active');
            });
            
            // Add active class to target panel
            const newPanel = document.getElementById(targetId);
            if (newPanel) {
                newPanel.classList.add('active');
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
                    firstButton.classList.add('active');
                    firstButton.setAttribute('aria-selected', 'true');
                }
            }
        }
        
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
