// Familietre spesifikk JavaScript funksjonalitet

// Familietre data
const familyData = {
    karina: {
        name: "Karina Sætersdal Nilssen",
        birth: "1987-08-16",
        death: null,
        parents: ["marit", "ronald"],
        spouse: null,
        children: [],
        type: "current",
        description: "Slektens nåværende representant. Student i cybersikkerhet.",
        details: {
            birthplace: "Norge",
            education: "Student i cybersikkerhet",
            occupation: "Student"
        }
    },
    marit: {
        name: "Marit Jensen",
        birth: "1966-06-10",
        death: null,
        parents: ["inger", "rolf"],
        spouse: "ronald",
        children: ["karina"],
        type: "maternal",
        description: "Mor til Karina. Utdannet sekretær.",
        details: {
            birthplace: "Norge",
            education: "Utdannet sekretær",
            occupation: "Sekretær"
        }
    },
    ronald: {
        name: "Ronald Keith Johnson Jr.",
        birth: "1965-08-17",
        death: null,
        parents: ["endoline", "ronald-sr"],
        spouse: "marit",
        children: ["karina"],
        type: "paternal",
        description: "Far til Karina. Født i Seattle, USA.",
        details: {
            birthplace: "Seattle, USA",
            education: "Whittier Elementary School (Ballard), St. Louis Catholic High School (Honolulu, Hawaii 1979-1980), Blanchet High School (Ballard 1981-1982), Ballard High School (ikke fullført)",
            occupation: "Ukjent",
            addresses: [
                "7318 8th Avenue Northwest, 98117 Seattle (0-11 år)",
                "1116 Northwest 83rd, 98117 Seattle (11+ år)"
            ]
        }
    },
    inger: {
        name: "Inger Martgrete Jensen",
        birth: "1941-03-29",
        death: "2022",
        parents: ["olga", "leonard"],
        spouse: "rolf",
        children: ["marit"],
        type: "maternal",
        description: "Mormor til Karina. Utdannet sekretær.",
        details: {
            birthplace: "Bergen, Norge",
            education: "Utdannet sekretær",
            occupation: "Sekretær"
        }
    },
    rolf: {
        name: "Rolf Hartvig Korperud Jensen",
        birth: "1939-08-14",
        death: "1992",
        parents: ["olga-korperud", "hartvig"],
        spouse: "inger",
        children: ["marit"],
        type: "paternal",
        description: "Morfar til Karina. PhD fra Berkeley, professor.",
        details: {
            birthplace: "Norge",
            education: "PhD fra Berkeley",
            occupation: "Professor"
        }
    },
    olga: {
        name: "Olga Alræk",
        birth: "1916-08-03",
        death: null,
        parents: ["ingeborg", "ole-alrak"],
        spouse: "leonard",
        children: ["inger"],
        type: "maternal",
        description: "Oldemor til Karina (morsside). Sykepleier, utdannet på Ullevål.",
        details: {
            birthplace: "Bergen, Norge",
            education: "Sykepleier, utdannet på Ullevål",
            occupation: "Sykepleier"
        }
    },
    leonard: {
        name: "Leonard Olav Larsen Sætersdal",
        birth: "1913-07-19",
        death: "1994",
        parents: ["marie-kristine", "lars-marthin"],
        spouse: "olga",
        children: ["inger"],
        type: "maternal",
        description: "Oldefar til Karina (morsside). Bergen Katedralskole, akademiker.",
        details: {
            birthplace: "Bergen, Norge",
            education: "Bergen Katedralskole",
            occupation: "Akademiker"
        }
    },
    olgaKorperud: {
        name: "Olga Karoline Korperud",
        birth: "1907-07-24",
        death: "1994-09-22",
        parents: ["anna-marie", "nils-kristian"],
        spouse: "hartvig",
        children: ["rolf"],
        type: "paternal",
        description: "Oldemor til Karina (farsside).",
        details: {
            birthplace: "Oslo, Norge",
            education: "Ukjent",
            occupation: "Ukjent"
        }
    },
    hartvig: {
        name: "Hartvig Ludvik Jensen",
        birth: "1905-02-17",
        death: "1992-11-22",
        parents: ["mathilde", "jorgen"],
        spouse: "olga-korperud",
        children: ["rolf"],
        type: "paternal",
        description: "Oldefar til Karina (farsside).",
        details: {
            birthplace: "Fredrikstad, Norge",
            education: "Ukjent",
            occupation: "Ukjent"
        }
    },
    endoline: {
        name: "Endoline Munday",
        birth: "1927-10-24",
        death: null,
        parents: [],
        spouse: "ronald-sr",
        children: ["ronald"],
        type: "paternal",
        description: "Bestemor til Karina (farsside). Født i Seattle, USA.",
        details: {
            birthplace: "Seattle, USA",
            education: "Ukjent",
            occupation: "Ukjent"
        }
    },
    ronaldSr: {
        name: "Ronald Keith Johnson Sr.",
        birth: "1934-02-04",
        death: null,
        parents: ["elmer", "chrystal"],
        spouse: "endoline",
        children: ["ronald"],
        type: "paternal",
        description: "Bestefar til Karina (farsside). Flyingerør hos Boeing.",
        details: {
            birthplace: "Seattle, USA",
            education: "Ukjent",
            occupation: "Flyingerør hos Boeing"
        }
    }
};

// Initialize tree functionality
document.addEventListener('DOMContentLoaded', function() {
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
            <span>Karina</span>
        </div>
    `);
    
    legend.innerHTML = legendItems.join('');
    return legend;
}

function generateMaternalTreeData(container) {
    // Implementation for maternal tree with enhanced data
    // This would generate the tree structure with all the family data
}

function generatePaternalTreeData(container) {
    // Implementation for paternal tree with enhanced data
    // This would generate the tree structure with all the family data
}

function generateCombinedTreeData(container) {
    // Implementation for combined tree with enhanced data
    // This would generate the tree structure with all the family data
}
