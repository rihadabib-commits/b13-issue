
// Containers & Elements
const categoriesContainer = document.getElementById("categoriescontainer");
let allIssues = [];

// Buttons
const allBtn = document.getElementById("allBtn");
const openBtn = document.getElementById("openBtn");
const closedBtn = document.getElementById("closedBtn");
const buttons = [allBtn, openBtn, closedBtn];

// Search
const searchInput = document.querySelector('input[placeholder="Search issue..."]');

// Modal
const issueModal = document.getElementById("issueModal");
const modalContent = document.getElementById("modalContent");

// Spinner functions
function showSpinner(){
    categoriesContainer.innerHTML = `
    <div class="col-span-4 flex justify-center py-20">
        <span class="loading loading-spinner loading-lg"></span>
    </div>
    `;
}

function hideSpinner(){
    categoriesContainer.innerHTML = "";
}

// Display issues with if-else for status image
function displayIssues(issues){
    categoriesContainer.innerHTML = "";

    if(issues.length === 0){
        categoriesContainer.innerHTML = "<p class='col-span-4 text-center py-10 text-gray-500'>No issues found</p>";
        return;
    }

    issues.forEach(item => {
        let status = (item.status || "").trim().toLowerCase();

        // Border color
        let borderColor;
        if(status === "open"){
            borderColor = "border-t-4 border-green-500";
        } else if(status === "closed"){
            borderColor = "border-t-4 border-purple-500";
        } else {
            borderColor = "border-t-4 border-gray-300";
        }

        // Status image
        let statusImg;
        if(status === "open"){
            statusImg = "B13-A5-Github-Issue-Tracker/assets/Open-Status.png";
        } else if(status === "closed"){
            statusImg = "B13-A5-Github-Issue-Tracker/assets/Closed-Status.png";
        } else {
            statusImg = "B13-A5-Github-Issue-Tracker/assets/Open-Status.png"; // default
        }

        const card = document.createElement("div");
        card.className = `w-11/12 bg-white rounded-xl shadow p-5 space-y-5 cursor-pointer hover:shadow-lg transition ${borderColor}`;

        card.innerHTML = `
        <div class="flex justify-between">
            <img src="${statusImg}" class="w-5 h-5">
            <span class="text-xs bg-yellow-100 text-yellow-600 px-3 py-1 rounded-full">
                ${item.priority || "LOW"}
            </span>
        </div>

        <div>
            <h3 class="font-bold text-lg">${item.title}</h3>
            <p class="text-gray-500 text-sm">${item.description}</p>
        </div>

        <hr>

        <div class="text-xs text-gray-400">
            <p>#${item.id} by ${item.author || "unknown"}</p>
            <p>${item.date || "1/15/2024"}</p>
        </div>
        `;

        // Modal click
        card.addEventListener("click", () => {
            modalContent.innerHTML = card.innerHTML;
            issueModal.showModal();
        });

        categoriesContainer.appendChild(card);
    });
}

// Update issue count
function updateIssueCount(count){
    document.getElementById("issueCount").innerText = count + " Issues";
}

// Button active style
function setActiveButton(activeBtn){
    buttons.forEach(btn => {
        if(btn === activeBtn){
            btn.classList.add("bg-[#4A00FF]","text-white");
            btn.classList.remove("bg-white","text-gray-600");
        } else {
            btn.classList.remove("bg-[#4A00FF]","text-white");
            btn.classList.add("bg-white","text-gray-600");
        }
    });
}

// Load API
async function loadCategories(){
    showSpinner();
    try {
        const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues");
        const data = await res.json();
        allIssues = data.data || [];

        setTimeout(() => {
            displayIssues(allIssues);
            updateIssueCount(allIssues.length);
        }, 700);
    } catch(err){
        console.error(err);
        categoriesContainer.innerHTML = "<p class='col-span-4 text-center py-10'>Failed to load issues</p>";
    }
}

// All button
allBtn.onclick = () => {
    showSpinner();
    setTimeout(() => {
        displayIssues(allIssues);
        updateIssueCount(allIssues.length);
    }, 700);
    setActiveButton(allBtn);
};

// Open button
openBtn.onclick = () => {
    showSpinner();
    const openIssues = allIssues.filter(issue => (issue.status || "").trim().toLowerCase() === "open");
    setTimeout(() => {
        displayIssues(openIssues);
        updateIssueCount(openIssues.length);
    }, 700);
    setActiveButton(openBtn);
};

// Closed button
closedBtn.onclick = () => {
    showSpinner();
    const closedIssues = allIssues.filter(issue => (issue.status || "").trim().toLowerCase() === "closed");
    setTimeout(() => {
        displayIssues(closedIssues);
        updateIssueCount(closedIssues.length);
    }, 700);
    setActiveButton(closedBtn);
};

// Search
searchInput.addEventListener("input", () => {
    const query = searchInput.value.toLowerCase();
    const filtered = allIssues.filter(issue =>
        (issue.title || "").toLowerCase().includes(query) ||
        (issue.description || "").toLowerCase().includes(query)
    );
    displayIssues(filtered);
    updateIssueCount(filtered.length);
});

// Initial load
loadCategories();