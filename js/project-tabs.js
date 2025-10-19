/**
 * Project Tabs - Tabbed interface for project overviews
 */
(function() {
    'use strict';
    
    function initProjectTabs() {
        const tabButtons = document.querySelectorAll('.tab-list li[role="tab"]');
        const tabPanels = document.querySelectorAll('.tab-panel');
        const tabWrapper = document.querySelector('.tab-panels-wrapper');
        
        if (tabButtons.length === 0 || tabPanels.length === 0 || !tabWrapper) {
            return;
        }
        
        // Function to calculate and set the height of the tallest tab panel
        function setWrapperHeight() {
            let maxHeight = 0;
            
            // Temporarily show all panels to measure their heights
            tabPanels.forEach(function(panel) {
                const wasActive = panel.classList.contains('active');
                const originalDisplay = panel.style.display;
                const originalPosition = panel.style.position;
                
                // Temporarily make visible and positioned relatively to measure
                panel.style.display = 'block';
                panel.style.position = 'relative';
                panel.style.opacity = '0';
                panel.style.visibility = 'hidden';
                
                const height = panel.offsetHeight;
                if (height > maxHeight) {
                    maxHeight = height;
                }
                
                // Restore original state
                if (!wasActive) {
                    panel.style.display = originalDisplay;
                }
                panel.style.position = originalPosition;
                panel.style.opacity = '';
                panel.style.visibility = '';
            });
            
            // Set the wrapper height
            if (maxHeight > 0) {
                tabWrapper.style.minHeight = maxHeight + 'px';
            }
        }
        
        // Function to switch tabs with fade effect
        function switchTab(targetId) {
            // Find the currently active panel
            const currentPanel = document.querySelector('.tab-panel.active');
            
            if (currentPanel) {
                // Fade out current panel
                currentPanel.classList.add('fade-out');
                
                setTimeout(function() {
                    currentPanel.classList.remove('active', 'fade-in', 'fade-out');
                    currentPanel.style.display = 'none';
                    
                    // Fade in new panel
                    const newPanel = document.getElementById(targetId);
                    if (newPanel) {
                        newPanel.style.display = 'block';
                        setTimeout(function() {
                            newPanel.classList.add('active', 'fade-in');
                        }, 10);
                    }
                }, 500); // Match the fadeOut animation duration
            } else {
                // No current panel, just show the new one
                const newPanel = document.getElementById(targetId);
                if (newPanel) {
                    newPanel.style.display = 'block';
                    newPanel.classList.add('active', 'fade-in');
                }
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
                    firstPanel.style.display = 'block';
                    firstPanel.classList.add('active');
                    firstButton.classList.add('active');
                    firstButton.setAttribute('aria-selected', 'true');
                }
            }
        }
        
        // Calculate and set wrapper height on load
        setTimeout(function() {
            setWrapperHeight();
        }, 100);
        
        // Recalculate on window resize
        let resizeTimeout;
        window.addEventListener('resize', function() {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(function() {
                setWrapperHeight();
            }, 250);
        });
    }
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initProjectTabs);
    } else {
        initProjectTabs();
    }
})();
