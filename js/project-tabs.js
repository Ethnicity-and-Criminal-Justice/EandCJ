/**
 * Project Tabs - Tabbed interface for project overviews
 */
(function() {
    'use strict';
    
    function initProjectTabs() {
        const tabButtons = document.querySelectorAll('.tab-list li[role="tab"]');
        const tabPanels = document.querySelectorAll('.tab-panel');
        
        if (tabButtons.length === 0 || tabPanels.length === 0) {
            return;
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
                const targetId = this.getAttribute('data-target');
                if (targetId) {
                    switchTab(targetId);
                }
            });
            
            // Add keyboard support
            button.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
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
    }
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initProjectTabs);
    } else {
        initProjectTabs();
    }
})();
