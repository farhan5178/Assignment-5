
let allIssues=[];
const loadIssue=()=>
{
    const url=('https://phi-lab-server.vercel.app/api/v1/lab/issues')
    fetch(url)
    .then(res=>res.json())
    .then( data=>{
        allIssues=data.data;
        displayIssueTab();
        displayIssues(allIssues);
    }
        
    )  
}
// display

const displayIssueTab = () => {
   const tabsContainer = document.getElementById('tabs-container'); 

   const tabsDiv = document.createElement('div');
   tabsDiv.className = 'tabs tabs-boxed mt-5 gap-5 px-6';

   const allBtn = document.createElement('button');
   allBtn.className = 'btn btn-primary';
   allBtn.textContent = 'All';
   allBtn.onclick = () => displayIssues(allIssues);
   tabsDiv.appendChild(allBtn);

   const openBtn = document.createElement('button');
   openBtn.className = 'btn btn-primary';
   openBtn.textContent = 'Open';
   openBtn.onclick = () => displayIssues(allIssues.filter(i => i.status === 'open'));
   tabsDiv.appendChild(openBtn);

   const closedBtn = document.createElement('button');
   closedBtn.className = 'btn btn-primary';
   closedBtn.textContent = 'Closed';
   closedBtn.onclick = () => displayIssues(allIssues.filter(i => i.status === 'closed'));
   tabsDiv.appendChild(closedBtn);

   tabsContainer.innerHTML = '';
   tabsContainer.appendChild(tabsDiv);
}

const displayIssuesTab=()=>{
console.log(displayIssueTab)
}

//  Display korbo 

const displayIssues = (issues) => {
    const issueContainer = document.getElementById('issue-container');
    issueContainer.innerHTML = '';

    issues.forEach(issue => {
        const card = document.createElement('div');
card.className = 'bg-white p-5 rounded-xl shadow-sm border-t-4';
        card.innerHTML = `
            <h2 class="font-bold text-lg">${issue.title}</h2>
            <p class="text-sm text-gray-500 mt-1">${issue.description}</p>
            <div class="flex items-center gap-2 mt-2">
                <span class="px-2 py-1 text-xs rounded-full ${issue.status === 'open' ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'}">${issue.status}</span>
                ${issue.labels.map(label => `<span class="px-2 py-1 text-xs rounded-full bg-gray-200 text-gray-800">${label}</span>`).join(' ')}
            </div>
            <div class="text-sm text-gray-400 mt-2">
                Author: ${issue.author} | Assignee: ${issue.assignee} | Priority: ${issue.priority}
            </div>
        `;

        issueContainer.appendChild(card);
    });
}


loadIssue();

 