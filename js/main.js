// Hovedfunksjonalitet for familietre nettsiden
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Active navigation highlighting
    const sections = document.querySelectorAll('.section');
    const navItems = document.querySelectorAll('.nav-link');

    function updateActiveNav() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === '#' + current) {
                item.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', updateActiveNav);

    // Tree navigation buttons
    const treeButtons = document.querySelectorAll('.tree-btn');
    treeButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            treeButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            // Update tree display based on button clicked
            const treeType = this.id.replace('toggle-', '');
            updateTreeDisplay(treeType);
        });
    });

    // Initialize tree display
    updateTreeDisplay('maternal');

    // Search functionality
    const searchInput = document.getElementById('tree-search');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            filterTree(searchTerm);
        });
    }

    // Animate overview cards on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe overview cards
    const overviewCards = document.querySelectorAll('.overview-card');
    overviewCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });

    // Observe person cards
    const personCards = document.querySelectorAll('.person-card');
    personCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });

    // Timeline animation
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-50px)';
        item.style.transition = `opacity 0.6s ease ${index * 0.2}s, transform 0.6s ease ${index * 0.2}s`;
        observer.observe(item);
    });

    // Add click handlers for timeline items
    timelineItems.forEach(item => {
        item.addEventListener('click', function() {
            this.style.transform = 'scale(1.05)';
            setTimeout(() => {
                this.style.transform = '';
            }, 200);
        });
    });
});

// Tree display functions
function updateTreeDisplay(type) {
    const treeContainer = document.getElementById('family-tree');
    if (!treeContainer) return;

    // Show loading state
    treeContainer.innerHTML = '<div class="tree-loading">Laster familietre...</div>';

    // Simulate loading delay for better UX
    setTimeout(() => {
        let treeHTML = '';
        
        switch(type) {
            case 'maternal':
                treeHTML = generateMaternalTree();
                break;
            case 'paternal':
                treeHTML = generatePaternalTree();
                break;
            case 'combined':
                treeHTML = generateCombinedTree();
                break;
            default:
                treeHTML = generateMaternalTree();
        }

        treeContainer.innerHTML = treeHTML;
        
        // Add event listeners to tree persons
        addTreePersonListeners();
        
        // Add zoom controls
        addZoomControls();
    }, 500);
}

function generateMaternalTree() {
    return `
        <div class="tree-container">
            <div class="tree-legend">
                <div class="legend-item">
                    <div class="legend-color maternal"></div>
                    <span>Morsside</span>
                </div>
                <div class="legend-item">
                    <div class="legend-color current"></div>
                    <span>Karina</span>
                </div>
            </div>
            
            <div class="tree-generation">
                <div class="tree-person current" data-person="karina">
                    <div class="tree-person-name">Karina Sætersdal Nilssen</div>
                    <div class="tree-person-dates">1987-</div>
                    <div class="tree-person-relation">Slektens representant</div>
                </div>
            </div>
            
            <div class="tree-connection maternal"></div>
            
            <div class="tree-generation">
                <div class="tree-person maternal" data-person="marit">
                    <div class="tree-person-name">Marit Jensen</div>
                    <div class="tree-person-dates">1966-</div>
                    <div class="tree-person-relation">Mor</div>
                </div>
                <div class="tree-person" data-person="ronald">
                    <div class="tree-person-name">Ronald Keith Johnson Jr.</div>
                    <div class="tree-person-dates">1965-</div>
                    <div class="tree-person-relation">Far</div>
                </div>
            </div>
            
            <div class="tree-connection maternal"></div>
            
            <div class="tree-generation">
                <div class="tree-person maternal" data-person="inger">
                    <div class="tree-person-name">Inger Martgrete Jensen</div>
                    <div class="tree-person-dates">1941-2022</div>
                    <div class="tree-person-relation">Mormor</div>
                </div>
                <div class="tree-person" data-person="rolf">
                    <div class="tree-person-name">Rolf Hartvig Korperud Jensen</div>
                    <div class="tree-person-dates">1939-1992</div>
                    <div class="tree-person-relation">Morfar</div>
                </div>
            </div>
            
            <div class="tree-connection maternal"></div>
            
            <div class="tree-generation">
                <div class="tree-person maternal" data-person="olga">
                    <div class="tree-person-name">Olga Alræk</div>
                    <div class="tree-person-dates">1916-</div>
                    <div class="tree-person-relation">Oldemor</div>
                </div>
                <div class="tree-person maternal" data-person="leonard">
                    <div class="tree-person-name">Leonard Olav Larsen Sætersdal</div>
                    <div class="tree-person-dates">1913-1994</div>
                    <div class="tree-person-relation">Oldefar</div>
                </div>
            </div>
            
            <div class="tree-connection maternal"></div>
            
            <div class="tree-generation">
                <div class="tree-person maternal" data-person="ingeborg">
                    <div class="tree-person-name">Ingeborg Andrea Monsson Hope</div>
                    <div class="tree-person-dates">1886-1958</div>
                    <div class="tree-person-relation">Tippoldemor</div>
                </div>
                <div class="tree-person maternal" data-person="ole">
                    <div class="tree-person-name">Ole Jacobsen Alræk</div>
                    <div class="tree-person-dates">1886-1964</div>
                    <div class="tree-person-relation">Tippoldefar</div>
                </div>
            </div>
        </div>
    `;
}

function generatePaternalTree() {
    return `
        <div class="tree-container">
            <div class="tree-legend">
                <div class="legend-item">
                    <div class="legend-color paternal"></div>
                    <span>Farsside</span>
                </div>
                <div class="legend-item">
                    <div class="legend-color current"></div>
                    <span>Karina</span>
                </div>
            </div>
            
            <div class="tree-generation">
                <div class="tree-person current" data-person="karina">
                    <div class="tree-person-name">Karina Sætersdal Nilssen</div>
                    <div class="tree-person-dates">1987-</div>
                    <div class="tree-person-relation">Slektens representant</div>
                </div>
            </div>
            
            <div class="tree-connection paternal"></div>
            
            <div class="tree-generation">
                <div class="tree-person" data-person="marit">
                    <div class="tree-person-name">Marit Jensen</div>
                    <div class="tree-person-dates">1966-</div>
                    <div class="tree-person-relation">Mor</div>
                </div>
                <div class="tree-person paternal" data-person="ronald">
                    <div class="tree-person-name">Ronald Keith Johnson Jr.</div>
                    <div class="tree-person-dates">1965-</div>
                    <div class="tree-person-relation">Far</div>
                </div>
            </div>
            
            <div class="tree-connection paternal"></div>
            
            <div class="tree-generation">
                <div class="tree-person" data-person="inger">
                    <div class="tree-person-name">Inger Martgrete Jensen</div>
                    <div class="tree-person-dates">1941-2022</div>
                    <div class="tree-person-relation">Mormor</div>
                </div>
                <div class="tree-person" data-person="rolf">
                    <div class="tree-person-name">Rolf Hartvig Korperud Jensen</div>
                    <div class="tree-person-dates">1939-1992</div>
                    <div class="tree-person-relation">Morfar</div>
                </div>
            </div>
            
            <div class="tree-connection paternal"></div>
            
            <div class="tree-generation">
                <div class="tree-person" data-person="olga-korperud">
                    <div class="tree-person-name">Olga Karoline Korperud</div>
                    <div class="tree-person-dates">1907-1994</div>
                    <div class="tree-person-relation">Oldemor</div>
                </div>
                <div class="tree-person" data-person="hartvig">
                    <div class="tree-person-name">Hartvig Ludvik Jensen</div>
                    <div class="tree-person-dates">1905-1992</div>
                    <div class="tree-person-relation">Oldefar</div>
                </div>
            </div>
            
            <div class="tree-connection paternal"></div>
            
            <div class="tree-generation">
                <div class="tree-person" data-person="anna-marie">
                    <div class="tree-person-name">Anna Marie Olsdtr</div>
                    <div class="tree-person-dates">1878-1953</div>
                    <div class="tree-person-relation">Tippoldemor</div>
                </div>
                <div class="tree-person" data-person="nils-kristian">
                    <div class="tree-person-name">Nils Kristian Karlsen Korperud</div>
                    <div class="tree-person-dates">1883-1916</div>
                    <div class="tree-person-relation">Tippoldefar</div>
                </div>
            </div>
        </div>
    `;
}

function generateCombinedTree() {
    return `
        <div class="tree-container">
            <div class="tree-legend">
                <div class="legend-item">
                    <div class="legend-color maternal"></div>
                    <span>Morsside</span>
                </div>
                <div class="legend-item">
                    <div class="legend-color paternal"></div>
                    <span>Farsside</span>
                </div>
                <div class="legend-item">
                    <div class="legend-color current"></div>
                    <span>Karina</span>
                </div>
            </div>
            
            <div class="tree-generation">
                <div class="tree-person current" data-person="karina">
                    <div class="tree-person-name">Karina Sætersdal Nilssen</div>
                    <div class="tree-person-dates">1987-</div>
                    <div class="tree-person-relation">Slektens representant</div>
                </div>
            </div>
            
            <div class="tree-connection"></div>
            
            <div class="tree-generation">
                <div class="tree-person maternal" data-person="marit">
                    <div class="tree-person-name">Marit Jensen</div>
                    <div class="tree-person-dates">1966-</div>
                    <div class="tree-person-relation">Mor</div>
                </div>
                <div class="tree-person paternal" data-person="ronald">
                    <div class="tree-person-name">Ronald Keith Johnson Jr.</div>
                    <div class="tree-person-dates">1965-</div>
                    <div class="tree-person-relation">Far</div>
                </div>
            </div>
            
            <div class="tree-connection"></div>
            
            <div class="tree-generation">
                <div class="tree-person maternal" data-person="inger">
                    <div class="tree-person-name">Inger Martgrete Jensen</div>
                    <div class="tree-person-dates">1941-2022</div>
                    <div class="tree-person-relation">Mormor</div>
                </div>
                <div class="tree-person" data-person="rolf">
                    <div class="tree-person-name">Rolf Hartvig Korperud Jensen</div>
                    <div class="tree-person-dates">1939-1992</div>
                    <div class="tree-person-relation">Morfar</div>
                </div>
            </div>
            
            <div class="tree-connection"></div>
            
            <div class="tree-generation">
                <div class="tree-person maternal" data-person="olga">
                    <div class="tree-person-name">Olga Alræk</div>
                    <div class="tree-person-dates">1916-</div>
                    <div class="tree-person-relation">Oldemor (morsside)</div>
                </div>
                <div class="tree-person maternal" data-person="leonard">
                    <div class="tree-person-name">Leonard Olav Larsen Sætersdal</div>
                    <div class="tree-person-dates">1913-1994</div>
                    <div class="tree-person-relation">Oldefar (morsside)</div>
                </div>
                <div class="tree-person" data-person="olga-korperud">
                    <div class="tree-person-name">Olga Karoline Korperud</div>
                    <div class="tree-person-dates">1907-1994</div>
                    <div class="tree-person-relation">Oldemor (farsside)</div>
                </div>
                <div class="tree-person" data-person="hartvig">
                    <div class="tree-person-name">Hartvig Ludvik Jensen</div>
                    <div class="tree-person-dates">1905-1992</div>
                    <div class="tree-person-relation">Oldefar (farsside)</div>
                </div>
            </div>
        </div>
    `;
}

function addTreePersonListeners() {
    const treePersons = document.querySelectorAll('.tree-person');
    treePersons.forEach(person => {
        person.addEventListener('click', function() {
            const personId = this.getAttribute('data-person');
            showPersonDetails(personId);
        });
    });
}

function showPersonDetails(personId) {
    // This would show detailed information about the person
    // For now, just show an alert
    const personNames = {
        'karina': 'Karina Sætersdal Nilssen',
        'marit': 'Marit Jensen',
        'ronald': 'Ronald Keith Johnson Jr.',
        'inger': 'Inger Martgrete Jensen',
        'rolf': 'Rolf Hartvig Korperud Jensen',
        'olga': 'Olga Alræk',
        'leonard': 'Leonard Olav Larsen Sætersdal',
        'olga-korperud': 'Olga Karoline Korperud',
        'hartvig': 'Hartvig Ludvik Jensen',
        'anna-marie': 'Anna Marie Olsdtr',
        'nils-kristian': 'Nils Kristian Karlsen Korperud'
    };
    
    const personName = personNames[personId] || 'Ukjent person';
    alert(`Detaljert informasjon om ${personName} vil bli vist her.`);
}

function filterTree(searchTerm) {
    const treePersons = document.querySelectorAll('.tree-person');
    treePersons.forEach(person => {
        const personText = person.textContent.toLowerCase();
        if (personText.includes(searchTerm)) {
            person.style.display = 'block';
            person.style.opacity = '1';
        } else {
            person.style.display = 'none';
            person.style.opacity = '0.3';
        }
    });
}

function addZoomControls() {
    const treeContainer = document.getElementById('family-tree');
    if (!treeContainer) return;

    const zoomControls = document.createElement('div');
    zoomControls.className = 'tree-zoom';
    zoomControls.innerHTML = `
        <button class="zoom-btn" onclick="zoomIn()">+</button>
        <button class="zoom-btn" onclick="zoomOut()">-</button>
        <button class="zoom-btn" onclick="resetZoom()">⌂</button>
    `;
    
    document.body.appendChild(zoomControls);
}

function zoomIn() {
    const treeContainer = document.getElementById('family-tree');
    if (treeContainer) {
        const currentScale = parseFloat(treeContainer.style.transform.replace('scale(', '').replace(')', '')) || 1;
        const newScale = Math.min(currentScale + 0.1, 2);
        treeContainer.style.transform = `scale(${newScale})`;
    }
}

function zoomOut() {
    const treeContainer = document.getElementById('family-tree');
    if (treeContainer) {
        const currentScale = parseFloat(treeContainer.style.transform.replace('scale(', '').replace(')', '')) || 1;
        const newScale = Math.max(currentScale - 0.1, 0.5);
        treeContainer.style.transform = `scale(${newScale})`;
    }
}

function resetZoom() {
    const treeContainer = document.getElementById('family-tree');
    if (treeContainer) {
        treeContainer.style.transform = 'scale(1)';
    }
}
