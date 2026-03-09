const loadIssue = () => {
  manageSpinner(true);
  const url = "https://phi-lab-server.vercel.app/api/v1/lab/issues";
  fetch(url)
    .then((res) => res.json())
    .then((json) => {
      const allIssues = json.data.filter(
        (issue) => issue.status === "open" || issue.status === "closed",
      );
      issueCount.innerHTML = allIssues.length;
      displayIssues(json.data);
      manageSpinner(false);
    })
    .catch(() => manageSpinner(false));
};

const createElements = (arr) => {
  const labelConfig = {
    bug: {
      icon: '<i class="fa-solid fa-bug mr-1"></i>',
      bg: "bg-red-100 text-red-800",
    },
    "help wanted": {
      icon: '<i class="fa-solid fa-life-ring mr-1"></i>',
      bg: "bg-yellow-100 text-yellow-800",
    },
    enhancement: {
      icon: '<i class="fa-regular fa-star mr-1"></i>',
      bg: "bg-green-100 text-green-800",
    },
  };

  const htmlElements = arr.map((label) => {
    const config = labelConfig[label] || {
      icon: "",
      bg: "bg-gray-100 text-gray-800",
    };
    return `<span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${config.bg} mr-2">${config.icon}${label.toUpperCase()}</span>`;
  });

  return htmlElements.join(" ");
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

//date formatter
const formatDate = (isoString) => {
  const date = new Date(isoString);
  return date.toLocaleDateString("en-US", {
    month: "numeric",
    day: "numeric",
    year: "numeric",
  });
};

// Priority badge colour mapping
const priorityColor = {
  high: "bg-red-100 text-red-800",
  medium: "bg-yellow-100 text-yellow-800",
  low: "bg-green-100 text-green-800",
};

//basic display issues
const displayIssues = (issues) => {
  const issueContainer = document.getElementById("issue-container");
  issueContainer.innerHTML = "";

  issues.forEach((issue) => {
    const card = document.createElement("div");
    card.className = "cursor-pointer";

    let borderColor = issue.status === "closed" ? "border-t-4 border-purple-500" : "border-t-4 border-green-500";

    card.addEventListener("click", () => loadIssueDetails(issue.id));
    card.innerHTML = `
     <div class="bg-white rounded-xl flex flex-col p-5 border border-gray-200 space-y-3 h-full ${borderColor}">
        
        <div class="flex items-center justify-between">
          <img 
            src="${issue.status === "closed" ? "assets/Closed-Status.png" : "assets/Open-Status.png"}" 
            alt="" 
            class="w-7 h-7"
          />
          <span class="inline-flex items-center px-2 py-1 rounded text-xs font-semibold uppercase ${priorityColor[issue.priority] || "bg-gray-100 text-gray-800"}">
            ${issue.priority}
          </span>
        </div>
        
        <h2 class="font-bold text-lg">${issue.title}</h2>
        
        <p class="text-gray-600 text-sm line-clamp-2">${issue.description}</p>
        
        <div class="flex flex-wrap gap-2">${createElements(issue.labels)}</div>
        
        <div class="text-xs text-gray-500 pt-2 border-t border-gray-100">
          <div>#${issue.id} by ${issue.author}</div>
          <div>${formatDate(issue.createdAt)}</div>
        </div>

      </div>
    `;
    issueContainer.append(card);
  });
};

//all button
// document.getElementById("all-btn").addEventListener("click", () => {
//   loadIssue();
// });

const allBtn = document.getElementById("all-btn");
allBtn.addEventListener("click", () => {
  loadIssue();
  document.getElementById("open-btn").classList.remove("btn-primary");
  document.getElementById("close-btn").classList.remove("btn-primary");
  allBtn.classList.add("btn-primary");
});
allBtn.classList.add("btn-primary");

//open button
const openBtn = document.getElementById("open-btn");
openBtn.addEventListener("click", () => {
  manageSpinner(true);
  const url = "https://phi-lab-server.vercel.app/api/v1/lab/issues";
  fetch(url)
    .then((res) => res.json())
    .then((json) => {
      const openIssues = json.data.filter((issue) => issue.status === "open");
      issueCount.innerHTML = openIssues.length;
      displayIssues(openIssues);
      manageSpinner(false);
    })
    .catch(() => manageSpinner(false));
  document.getElementById("all-btn").classList.remove("btn-primary");
  document.getElementById("close-btn").classList.remove("btn-primary");
  openBtn.classList.add("btn-primary");
});

//close button
const closeBtn = document.getElementById("close-btn");
closeBtn.addEventListener("click", () => {
  manageSpinner(true);
  const url = "https://phi-lab-server.vercel.app/api/v1/lab/issues";
  fetch(url)
    .then((res) => res.json())
    .then((json) => {
      const closedIssues = json.data.filter(
        (issue) => issue.status === "closed",
      );
      issueCount.innerHTML = closedIssues.length;
      displayIssues(closedIssues);
      manageSpinner(false);
    })
    .catch(() => manageSpinner(false));
  document.getElementById("all-btn").classList.remove("btn-primary");
  document.getElementById("open-btn").classList.remove("btn-primary");
  closeBtn.classList.add("btn-primary");
});

//example
// {
// "status": "success",
// "message": "Issue fetched successfully",
// "data": {
// "id": 33,
// "title": "Add bulk operations support",
// "description": "Allow users to perform bulk actions like delete, update status on multiple items at once.",
// "status": "open",
// "labels": [
// "enhancement"
// ],
// "priority": "low",
// "author": "bulk_barry",
// "assignee": "",
// "createdAt": "2024-02-02T10:00:00Z",
// "updatedAt": "2024-02-02T10:00:00Z"
// }
// }

const loadIssueDetails = async (id) => {
  manageSpinner(true);
  const url = `https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`;
  const res = await fetch(url);
  const data = await res.json();
  displayIssueDetails(data.data);
  manageSpinner(false);
};

const displayIssueDetails = (issue) => {
  const detailsBox = document.getElementById("details-container");

  //stolen from createElements function
  const labelConfig = {
    bug: {
      icon: '<i class="fa-solid fa-bug mr-1"></i>',
      bg: "bg-red-100 text-red-800",
    },
    "help wanted": {
      icon: '<i class="fa-solid fa-life-ring mr-1"></i>',
      bg: "bg-yellow-100 text-yellow-800",
    },
    enhancement: {
      icon: '<i class="fa-regular fa-star mr-1"></i>',
      bg: "bg-green-100 text-green-800",
    },
  };

  const renderLabels = (labels) => {
    if (!labels || labels.length === 0) {
      return '<p class="text-gray-500">No labels</p>';
    }
    return labels
      .map((label) => {
        const config = labelConfig[label] || {
          icon: "",
          bg: "bg-gray-100 text-gray-800",
        };
        return `<span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${config.bg} mr-2">${config.icon}${label.toUpperCase()}</span>`;
      })
      .join("");
  };

  const statusBadgeClass =
    issue.status === "open" ?  "badge-primary" : "badge-success";

  detailsBox.innerHTML = `
    <div class="text-2xl font-bold mb-2">
      ${issue.title}
    </div>

    <div class="flex items-center gap-2 text-sm text-gray-600 mb-4">
      <span class="badge ${statusBadgeClass}">${issue.status}</span>
      <span>
        Opened by ${issue.author} •
        ${formatDate(issue.createdAt)}
      </span>
    </div>

    <p class="mb-4">${issue.description}</p>

    <div class="mb-4">
      ${renderLabels(issue.labels)}
    </div>

    <div class="mb-2">
      <span class="font-bold">Assign :</span>
      ${issue.assignee}
    </div>

    <div class="mb-4">
      <span class="font-bold">Priority</span>
      ${issue.priority}
    </div>
  `;

  // Show the modal
  document.getElementById("my_modal_5").showModal();
};

const manageSpinner = (status) => {
  if (status == true) {
    document.getElementById("spinner").classList.remove("hidden");
    document.getElementById("issue-container").classList.add("hidden");
  } else {
    document.getElementById("spinner").classList.add("hidden");
    document.getElementById("issue-container").classList.remove("hidden");
  }
};

loadIssue();

document.getElementById("btn-search").addEventListener("click", () => {
  const input = document.getElementById("input-search");
  const searchValue = input.value.trim().toLowerCase();

  fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issues`)
    .then((res) => res.json())
    .then((data) => {
      const allWords = data.data;
      const filterWords = allWords.filter((issue) =>
        issue.title.toLowerCase().includes(searchValue),
      );

      displayIssues(filterWords);
    });
});
