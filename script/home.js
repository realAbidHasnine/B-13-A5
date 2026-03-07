const loadIssue = () => {
  const url = "https://phi-lab-server.vercel.app/api/v1/lab/issues";
  fetch(url)
    .then((res) => res.json())
    .then((json) => displayIssues(json.data));
};

// "id": 1,
// "title": "Fix navigation menu on mobile devices",
// "description": "The navigation menu doesn't collapse properly on mobile devices. Need to fix the responsive behavior.",
// "status": "open",
// "labels": [
// "bug",
// "help wanted"
// ],
// "priority": "high",
// "author": "john_doe",
// "assignee": "jane_smith",
// "createdAt": "2024-01-15T10:30:00Z",
// "updatedAt": "2024-01-15T10:30:00Z"

const displayIssues = (issues) => {
  const issueContainer = document.getElementById("issue-container");
  issueContainer.innerHTML = "";

  issues.forEach((issue) => {
    const card = document.createElement("div");
    card.innerHTML = `
      <div class="bg-white rounded-xl flex flex-col text-center py-10 px-5 space-y-4 border border-gray-200">
        <h2 class="font-bold text-xl">${issue.title}</h2>
        <p class="text-gray-600 text-sm">${issue.description}</p>
        <div class="mt-3 flex justify-between">
            <div>
            <p class="text-[#64748B]"><small> ${issue.id} by ${issue.author} </small></p>
            <p class="text-[#64748B]"><small> 1/15/2025 </small></p> 
            </div>
            <div>
            <p class="text-[#64748B]"> <small> ${issue.createdAt} </small> </p>
            <p class="text-[#64748B]"> <small> ${issue.updatedAt} </small> </p>
            </div> 
        </div>
      </div>
    `;

    issueContainer.append(card);
  });
};

loadIssue();
