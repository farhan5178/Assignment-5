let allIssues = [];

// Load all issues
const loadIssue = () => {
    const url = 'https://phi-lab-server.vercel.app/api/v1/lab/issues';

    fetch(url)
        .then(res => res.json())
        .then(data => {
            allIssues = data.data;

            updateTotal(allIssues);
            displayIssueTab();
            displayIssues(allIssues);
        });
};

// Update total count
const updateTotal = (issues) => {
    document.getElementById('total-issues').innerText = `${issues.length} Issues`;
};


const displayIssueTab = () => {
    const tabsContainer = document.getElementById('tabs-container');

    const tabsDiv = document.createElement('div');
    tabsDiv.className = 'tabs tabs-boxed mt-5 gap-5 px-6';

    const createBtn = (text, filterFn) => {
        const btn = document.createElement('button');
        btn.className = 'btn btn-primary filter-btn';
        btn.textContent = text;

       btn.addEventListener('click', () => {

    // active style
    document.querySelectorAll('.filter-btn').forEach(b => {
        b.classList.remove('bg-blue-600', 'text-white');
    });
    btn.classList.add('bg-blue-600', 'text-white');

    showLoader(); 

    setTimeout(() => {   
        const filtered = filterFn();

        displayIssues(filtered);
        updateTotal(filtered);

        hideLoader();
    }, 300);
});

        return btn;
    };

    tabsDiv.appendChild(createBtn('All', () => allIssues));
    tabsDiv.appendChild(createBtn('Open', () => allIssues.filter(i => i.status === 'open')));
    tabsDiv.appendChild(createBtn('Closed', () => allIssues.filter(i => i.status === 'closed')));

    tabsContainer.innerHTML = '';
    tabsContainer.appendChild(tabsDiv);
};

// Display issues
const displayIssues = (issues) => {
    const issueContainer = document.getElementById('issue-container');
    issueContainer.innerHTML = '';

    const priorityColor = {
        high: 'bg-red-100 text-red-500',
        medium: 'bg-yellow-100 text-yellow-600',
        low: 'bg-gray-200 text-gray-500'
    };

    issues.forEach(issue => {
        const card = document.createElement('div');

        const borderColor = issue.status === 'open'
            ? 'border-green-500'
            : 'border-purple-500';

        card.className = `bg-white p-5 rounded-xl shadow-sm border-t-4 ${borderColor} cursor-pointer hover:shadow-lg transition`;

       //for model opem
        card.addEventListener('click', () => {
            loadSingleIssue(issue.id);
        });

        card.innerHTML = `
        <div class="relative pt-6">

            <span class="absolute top-0 right-0 px-3 py-1 text-xs rounded-full ${priorityColor[issue.priority]}">
                ${issue.priority.toUpperCase()}
            </span>

            <h2 class="font-bold text-lg">${issue.title}</h2>
            <p class="text-sm text-gray-500 mt-1">${issue.description}</p>

            <div class="flex items-center gap-2 mt-2">
                <span class="px-2 py-1 text-xs rounded-full ${
                    issue.status === 'open'
                    ? 'bg-green-200 text-green-800'
                    : 'bg-red-200 text-red-800'
                }">
                    ${issue.status}
                </span>

                ${issue.labels.map(label => `
                    <span class="px-2 py-1 text-xs rounded-full bg-yellow-200 text-yellow-800">
                        ${label}
                    </span>
                `).join('')}
            </div>

            <div class="text-sm text-gray-400 mt-2">
                Author: ${issue.author} <br>
                Assignee: ${issue.assignee}
            </div>

        </div>
        `;

        issueContainer.appendChild(card);
    });
};

// Load single issue
const loadSingleIssue = (id) => {
    const url = `https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`;

    fetch(url)
        .then(res => res.json())
        .then(data => {
            showModal(data.data);
        });
};

// Show modal
const showModal = (issue) => {
    const modalContent = document.getElementById('modal-content');

    modalContent.innerHTML = `
        <h2 class="text-xl font-bold">${issue.title}</h2>
        <p class="text-gray-500 mt-2">${issue.description}</p>

        <div class="mt-3 flex gap-2">
            <span class="px-2 py-1 text-xs bg-blue-200 rounded">
                ${issue.priority}
            </span>
            <span class="px-2 py-1 text-xs ${
                issue.status === 'open'
                ? 'bg-green-200'
                : 'bg-red-200'
            } rounded">
                ${issue.status}
            </span>
        </div>

        <div class="mt-3">
            ${issue.labels.map(l => `
                <span class="px-2 py-1 text-xs bg-yellow-200 rounded">
                    ${l}
                </span>
            `).join('')}
        </div>

        <div class="mt-4 text-sm text-gray-500">
            Author: ${issue.author} <br>
            Assignee: ${issue.assignee}
        </div>
    `;

    document.getElementById('issue_modal').showModal();
};

// Search issue 
const handleSearch = (text) => {
    const url = `https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${text}`;

    fetch(url)
        .then(res => res.json())
        .then(data => {
            displayIssues(data.data);
            updateTotal(data.data);
        });
};
document.getElementById('search-input').addEventListener('input', (e) => {
    const text = e.target.value;

    if (text === '') {
        displayIssues(allIssues); 
        updateTotal(allIssues);
    } else {
        handleSearch(text);
    }
});
//loding
const showLoader = () => {
    document.getElementById('loader').classList.remove('hidden');
};

const hideLoader = () => {
    document.getElementById('loader').classList.add('hidden');
};


loadIssue();