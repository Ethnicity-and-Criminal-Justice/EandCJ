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
            
            tabPanels.forEach(function(panel) {
                // Temporarily make it visible and relatively positioned to measure
                panel.style.position = 'relative';
                panel.style.visibility = 'visible';
                panel.style.opacity = '0';
                
                const height = panel.offsetHeight;
                if (height > maxHeight) {
                    maxHeight = height;
                }
                
                // Reset to initial state
                panel.style.position = '';
                panel.style.visibility = '';
                panel.style.opacity = '';
            });
            
            if (maxHeight > 0) {
                wrapper.style.minHeight = maxHeight + 'px';
            }
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
