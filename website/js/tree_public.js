// Familietre spesifikk JavaScript funksjonalitet for offentlig versjon

// Last inn offentlig familietre data
let familyData = {};

// Last inn data fra JSON fil
async function loadFamilyData() {
    try {
        const response = await fetch('data/family_public.json');
        const data = await response.json();
        familyData = data.family;
        return data;
    } catch (error) {
        console.error('Kunne ikke laste familietre data:', error);
        // Fallback til hardkodet data
        familyData = getFallbackData();
        return { family: familyData };
    }
}

// Fallback data hvis JSON ikke kan lastes
function getFallbackData() {
    return {
        current: {
            name: "Familie Representant",
            birth: "1987",
            death: null,
            parents: ["parent1", "parent2"],
            spouse: null,
            children: [],
            type: "current",
            description: "Slektens nåværende representant.",
            details: {
                birthplace: "Norge",
                education: "Student",
                occupation: "Student"
            }
        },
        parent1: {
            name: "Mor",
            birth: "1966",
            death: null,
            parents: ["grandparent1", "grandparent2"],
            spouse: "parent2",
            children: ["current"],
            type: "maternal",
            description: "Mor til slektens representant.",
            details: {
                birthplace: "Norge",
                education: "Utdannet",
                occupation: "Arbeider"
            }
        },
        parent2: {
            name: "Far",
            birth: "1965",
            death: null,
            parents: ["grandparent3", "grandparent4"],
            spouse: "parent1",
            children: ["current"],
            type: "paternal",
            description: "Far til slektens representant.",
            details: {
                birthplace: "USA",
                education: "Grunnskole, videregående skole (ikke fullført)",
                occupation: "Arbeider"
            }
        },
        grandparent1: {
            name: "Mormor",
            birth: "1941",
            death: "2022",
            parents: ["greatgrandparent1", "greatgrandparent2"],
            spouse: "grandparent2",
            children: ["parent1"],
            type: "maternal",
            description: "Mormor til slektens representant.",
            details: {
                birthplace: "Bergen, Norge",
                education: "Utdannet",
                occupation: "Arbeider"
            }
        },
        grandparent2: {
            name: "Morfar",
            birth: "1939",
            death: "1992",
            parents: ["greatgrandparent3", "greatgrandparent4"],
            spouse: "grandparent1",
            children: ["parent1"],
            type: "paternal",
            description: "Morfar til slektens representant. Professor.",
            details: {
                birthplace: "Norge",
                education: "PhD",
                occupation: "Professor"
            }
        },
        greatgrandparent1: {
            name: "Oldemor (morsside)",
            birth: "1916",
            death: null,
            parents: ["ancestor1", "ancestor2"],
            spouse: "greatgrandparent2",
            children: ["grandparent1"],
            type: "maternal",
            description: "Oldemor til slektens representant. Sykepleier.",
            details: {
                birthplace: "Bergen, Norge",
                education: "Sykepleier",
                occupation: "Sykepleier"
            }
        },
        greatgrandparent2: {
            name: "Oldefar (morsside)",
            birth: "1913",
            death: "1994",
            parents: ["ancestor3", "ancestor4"],
            spouse: "greatgrandparent1",
            children: ["grandparent1"],
            type: "maternal",
            description: "Oldefar til slektens representant. Akademiker.",
            details: {
                birthplace: "Bergen, Norge",
                education: "Bergen Katedralskole",
                occupation: "Akademiker"
            }
        },
        ancestor1: {
            name: "Tippoldemor",
            birth: "1886",
            death: "1958",
            parents: [],
            spouse: "ancestor2",
            children: ["greatgrandparent1"],
            type: "maternal",
            description: "Tippoldemor til slektens representant.",
            details: {
                birthplace: "Masfjorden, Norge",
                education: "Ukjent",
                occupation: "Ukjent"
            }
        },
        ancestor2: {
            name: "Tippoldefar",
            birth: "1886",
            death: "1964",
            parents: [],
            spouse: "ancestor1",
            children: ["greatgrandparent1"],
            type: "maternal",
            description: "Tippoldefar til slektens representant.",
            details: {
                birthplace: "Norge",
                education: "Ukjent",
                occupation: "Ukjent"
            }
        }
    };
}

// Initialize tree functionality
document.addEventListener('DOMContentLoaded', async function() {
    await loadFamilyData();
    initializeTree();
    setupSearch();
    setupPersonDetails();
});

function initializeTree() {
    const treeContainer = document.getElementById('family-tree');
    if (!treeContainer) return;

    // Add search functionality
    const searchHTML = `
        <div class="tree-search">
            <input type="text" id="tree-search" placeholder="Søk etter person...">
        </div>
    `;
    
    treeContainer.insertAdjacentHTML('afterbegin', searchHTML);
}

function setupSearch() {
    const searchInput = document.getElementById('tree-search');
    if (!searchInput) return;

    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase().trim();
        filterTreePersons(searchTerm);
    });
}

function filterTreePersons(searchTerm) {
    const treePersons = document.querySelectorAll('.tree-person');
    
    treePersons.forEach(person => {
        const personId = person.getAttribute('data-person');
        const personData = familyData[personId];
        
        if (!personData) return;
        
        const searchableText = [
            personData.name,
            personData.description,
            personData.details.birthplace,
            personData.details.occupation
        ].join(' ').toLowerCase();
        
        if (searchTerm === '' || searchableText.includes(searchTerm)) {
            person.style.display = 'block';
            person.style.opacity = '1';
            person.style.transform = 'scale(1)';
        } else {
            person.style.display = 'none';
            person.style.opacity = '0.3';
            person.style.transform = 'scale(0.95)';
        }
    });
}

function setupPersonDetails() {
    // Add click handlers for person details
    document.addEventListener('click', function(e) {
        const personElement = e.target.closest('.tree-person');
        if (personElement) {
            const personId = personElement.getAttribute('data-person');
            showPersonModal(personId);
        }
    });
}

function showPersonModal(personId) {
    const personData = familyData[personId];
    if (!personData) return;

    const modal = createPersonModal(personData);
    document.body.appendChild(modal);
    
    // Animate modal in
    setTimeout(() => {
        modal.classList.add('show');
    }, 10);
}

function createPersonModal(personData) {
    const modal = document.createElement('div');
    modal.className = 'person-modal';
    modal.innerHTML = `
        <div class="modal-backdrop"></div>
        <div class="modal-content">
            <div class="modal-header">
                <h2>${personData.name}</h2>
                <button class="modal-close">&times;</button>
            </div>
            <div class="modal-body">
                <div class="person-info">
                    <div class="info-section">
                        <h3>Grunnleggende informasjon</h3>
                        <p><strong>Født:</strong> ${formatDate(personData.birth)}</p>
                        ${personData.death ? `<p><strong>Død:</strong> ${formatDate(personData.death)}</p>` : ''}
                        <p><strong>Beskrivelse:</strong> ${personData.description}</p>
                    </div>
                    
                    <div class="info-section">
                        <h3>Detaljer</h3>
                        <p><strong>Fødested:</strong> ${personData.details.birthplace}</p>
                        ${personData.details.education ? `<p><strong>Utdanning:</strong> ${personData.details.education}</p>` : ''}
                        ${personData.details.occupation ? `<p><strong>Yrke:</strong> ${personData.details.occupation}</p>` : ''}
                        ${personData.details.addresses ? `
                            <p><strong>Adresser:</strong></p>
                            <ul>
                                ${personData.details.addresses.map(addr => `<li>${addr}</li>`).join('')}
                            </ul>
                        ` : ''}
                    </div>
                    
                    ${personData.parents.length > 0 ? `
                        <div class="info-section">
                            <h3>Foreldre</h3>
                            <ul>
                                ${personData.parents.map(parentId => {
                                    const parent = familyData[parentId];
                                    return parent ? `<li>${parent.name}</li>` : '';
                                }).join('')}
                            </ul>
                        </div>
                    ` : ''}
                    
                    ${personData.children.length > 0 ? `
                        <div class="info-section">
                            <h3>Barn</h3>
                            <ul>
                                ${personData.children.map(childId => {
                                    const child = familyData[childId];
                                    return child ? `<li>${child.name}</li>` : '';
                                }).join('')}
                            </ul>
                        </div>
                    ` : ''}
                </div>
            </div>
        </div>
    `;
    
    // Add event listeners
    modal.querySelector('.modal-close').addEventListener('click', () => closeModal(modal));
    modal.querySelector('.modal-backdrop').addEventListener('click', () => closeModal(modal));
    
    // Add modal styles
    addModalStyles();
    
    return modal;
}

function closeModal(modal) {
    modal.classList.remove('show');
    setTimeout(() => {
        if (modal.parentNode) {
            modal.parentNode.removeChild(modal);
        }
    }, 300);
}

function addModalStyles() {
    if (document.getElementById('modal-styles')) return;
    
    const styles = document.createElement('style');
    styles.id = 'modal-styles';
    styles.textContent = `
        .person-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 1000;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
        }
        
        .person-modal.show {
            opacity: 1;
            visibility: visible;
        }
        
        .modal-backdrop {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            backdrop-filter: blur(5px);
        }
        
        .modal-content {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%) scale(0.9);
            background: white;
            border-radius: 15px;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
            max-width: 600px;
            width: 90%;
            max-height: 80vh;
            overflow-y: auto;
            transition: transform 0.3s ease;
        }
        
        .person-modal.show .modal-content {
            transform: translate(-50%, -50%) scale(1);
        }
        
        .modal-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 20px 30px;
            border-bottom: 1px solid #dee2e6;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            border-radius: 15px 15px 0 0;
        }
        
        .modal-header h2 {
            margin: 0;
            font-family: 'Playfair Display', serif;
        }
        
        .modal-close {
            background: none;
            border: none;
            color: white;
            font-size: 2rem;
            cursor: pointer;
            padding: 0;
            width: 30px;
            height: 30px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            transition: background-color 0.3s ease;
        }
        
        .modal-close:hover {
            background-color: rgba(255, 255, 255, 0.2);
        }
        
        .modal-body {
            padding: 30px;
        }
        
        .person-info {
            display: flex;
            flex-direction: column;
            gap: 25px;
        }
        
        .info-section h3 {
            color: #2c3e50;
            margin-bottom: 15px;
            font-family: 'Playfair Display', serif;
            border-bottom: 2px solid #667eea;
            padding-bottom: 5px;
        }
        
        .info-section p {
            margin-bottom: 10px;
            line-height: 1.6;
        }
        
        .info-section ul {
            margin-left: 20px;
        }
        
        .info-section li {
            margin-bottom: 5px;
        }
        
        @media (max-width: 768px) {
            .modal-content {
                width: 95%;
                max-height: 90vh;
            }
            
            .modal-header {
                padding: 15px 20px;
            }
            
            .modal-body {
                padding: 20px;
            }
        }
    `;
    
    document.head.appendChild(styles);
}

function formatDate(dateString) {
    if (!dateString) return 'Ukjent';
    
    // Hvis det bare er et år
    if (dateString.length === 4) {
        return dateString;
    }
    
    const date = new Date(dateString);
    const options = { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    };
    
    return date.toLocaleDateString('no-NO', options);
}

// Tree generation functions with enhanced data
function generateEnhancedMaternalTree() {
    return generateTreeWithData('maternal');
}

function generateEnhancedPaternalTree() {
    return generateTreeWithData('paternal');
}

function generateEnhancedCombinedTree() {
    return generateTreeWithData('combined');
}

function generateTreeWithData(type) {
    const treeContainer = document.createElement('div');
    treeContainer.className = 'tree-container';
    
    // Add legend
    const legend = createLegend(type);
    treeContainer.appendChild(legend);
    
    // Generate tree based on type
    switch(type) {
        case 'maternal':
            generateMaternalTreeData(treeContainer);
            break;
        case 'paternal':
            generatePaternalTreeData(treeContainer);
            break;
        case 'combined':
            generateCombinedTreeData(treeContainer);
            break;
    }
    
    return treeContainer.outerHTML;
}

function createLegend(type) {
    const legend = document.createElement('div');
    legend.className = 'tree-legend';
    
    const legendItems = [];
    
    if (type === 'maternal' || type === 'combined') {
        legendItems.push(`
            <div class="legend-item">
                <div class="legend-color maternal"></div>
                <span>Morsside</span>
            </div>
        `);
    }
    
    if (type === 'paternal' || type === 'combined') {
        legendItems.push(`
            <div class="legend-item">
                <div class="legend-color paternal"></div>
                <span>Farsside</span>
            </div>
        `);
    }
    
    legendItems.push(`
        <div class="legend-item">
            <div class="legend-color current"></div>
            <span>Nåværende representant</span>
        </div>
    `);
    
    legend.innerHTML = legendItems.join('');
    return legend;
}

function generateMaternalTreeData(container) {
    // Generate maternal tree with public data
    const current = familyData.current;
    const parent1 = familyData.parent1;
    const grandparent1 = familyData.grandparent1;
    const grandparent2 = familyData.grandparent2;
    const greatgrandparent1 = familyData.greatgrandparent1;
    const greatgrandparent2 = familyData.greatgrandparent2;
    const ancestor1 = familyData.ancestor1;
    const ancestor2 = familyData.ancestor2;
    
    const treeHTML = `
        <div class="tree-generation">
            <div class="tree-person current" data-person="current">
                <div class="tree-person-name">${current.name}</div>
                <div class="tree-person-dates">${current.birth}-</div>
                <div class="tree-person-relation">Slektens representant</div>
            </div>
        </div>
        
        <div class="tree-connection maternal"></div>
        
        <div class="tree-generation">
            <div class="tree-person maternal" data-person="parent1">
                <div class="tree-person-name">${parent1.name}</div>
                <div class="tree-person-dates">${parent1.birth}-</div>
                <div class="tree-person-relation">Mor</div>
            </div>
        </div>
        
        <div class="tree-connection maternal"></div>
        
        <div class="tree-generation">
            <div class="tree-person maternal" data-person="grandparent1">
                <div class="tree-person-name">${grandparent1.name}</div>
                <div class="tree-person-dates">${grandparent1.birth}-${grandparent1.death}</div>
                <div class="tree-person-relation">Mormor</div>
            </div>
            <div class="tree-person" data-person="grandparent2">
                <div class="tree-person-name">${grandparent2.name}</div>
                <div class="tree-person-dates">${grandparent2.birth}-${grandparent2.death}</div>
                <div class="tree-person-relation">Morfar</div>
            </div>
        </div>
        
        <div class="tree-connection maternal"></div>
        
        <div class="tree-generation">
            <div class="tree-person maternal" data-person="greatgrandparent1">
                <div class="tree-person-name">${greatgrandparent1.name}</div>
                <div class="tree-person-dates">${greatgrandparent1.birth}-${greatgrandparent1.death || ''}</div>
                <div class="tree-person-relation">Oldemor</div>
            </div>
            <div class="tree-person maternal" data-person="greatgrandparent2">
                <div class="tree-person-name">${greatgrandparent2.name}</div>
                <div class="tree-person-dates">${greatgrandparent2.birth}-${greatgrandparent2.death}</div>
                <div class="tree-person-relation">Oldefar</div>
            </div>
        </div>
        
        <div class="tree-connection maternal"></div>
        
        <div class="tree-generation">
            <div class="tree-person maternal" data-person="ancestor1">
                <div class="tree-person-name">${ancestor1.name}</div>
                <div class="tree-person-dates">${ancestor1.birth}-${ancestor1.death}</div>
                <div class="tree-person-relation">Tippoldemor</div>
            </div>
            <div class="tree-person maternal" data-person="ancestor2">
                <div class="tree-person-name">${ancestor2.name}</div>
                <div class="tree-person-dates">${ancestor2.birth}-${ancestor2.death}</div>
                <div class="tree-person-relation">Tippoldefar</div>
            </div>
        </div>
    `;
    
    container.insertAdjacentHTML('beforeend', treeHTML);
}

function generatePaternalTreeData(container) {
    // Generate paternal tree with public data
    const current = familyData.current;
    const parent2 = familyData.parent2;
    
    const treeHTML = `
        <div class="tree-generation">
            <div class="tree-person current" data-person="current">
                <div class="tree-person-name">${current.name}</div>
                <div class="tree-person-dates">${current.birth}-</div>
                <div class="tree-person-relation">Slektens representant</div>
            </div>
        </div>
        
        <div class="tree-connection paternal"></div>
        
        <div class="tree-generation">
            <div class="tree-person paternal" data-person="parent2">
                <div class="tree-person-name">${parent2.name}</div>
                <div class="tree-person-dates">${parent2.birth}-</div>
                <div class="tree-person-relation">Far</div>
            </div>
        </div>
        
        <div class="tree-connection paternal"></div>
        
        <div class="tree-generation">
            <div class="tree-person paternal">
                <div class="tree-person-name">Besteforeldre (farsside)</div>
                <div class="tree-person-dates">1930-1990</div>
                <div class="tree-person-relation">Besteforeldre</div>
            </div>
        </div>
    `;
    
    container.insertAdjacentHTML('beforeend', treeHTML);
}

function generateCombinedTreeData(container) {
    // Generate combined tree with public data
    const current = familyData.current;
    const parent1 = familyData.parent1;
    const parent2 = familyData.parent2;
    const grandparent1 = familyData.grandparent1;
    const grandparent2 = familyData.grandparent2;
    
    const treeHTML = `
        <div class="tree-generation">
            <div class="tree-person current" data-person="current">
                <div class="tree-person-name">${current.name}</div>
                <div class="tree-person-dates">${current.birth}-</div>
                <div class="tree-person-relation">Slektens representant</div>
            </div>
        </div>
        
        <div class="tree-connection"></div>
        
        <div class="tree-generation">
            <div class="tree-person maternal" data-person="parent1">
                <div class="tree-person-name">${parent1.name}</div>
                <div class="tree-person-dates">${parent1.birth}-</div>
                <div class="tree-person-relation">Mor</div>
            </div>
            <div class="tree-person paternal" data-person="parent2">
                <div class="tree-person-name">${parent2.name}</div>
                <div class="tree-person-dates">${parent2.birth}-</div>
                <div class="tree-person-relation">Far</div>
            </div>
        </div>
        
        <div class="tree-connection"></div>
        
        <div class="tree-generation">
            <div class="tree-person maternal" data-person="grandparent1">
                <div class="tree-person-name">${grandparent1.name}</div>
                <div class="tree-person-dates">${grandparent1.birth}-${grandparent1.death}</div>
                <div class="tree-person-relation">Mormor</div>
            </div>
            <div class="tree-person" data-person="grandparent2">
                <div class="tree-person-name">${grandparent2.name}</div>
                <div class="tree-person-dates">${grandparent2.birth}-${grandparent2.death}</div>
                <div class="tree-person-relation">Morfar</div>
            </div>
        </div>
    `;
    
    container.insertAdjacentHTML('beforeend', treeHTML);
}
