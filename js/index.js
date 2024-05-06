import data from "../data.json" with { type: "json" };

const gridWrapper = document.getElementById("grid-wrapper");
const dailyBtn = document.getElementById("daily");
const weeklyBtn = document.getElementById("weekly");
const monthlyBtn = document.getElementById("monthly");
let currentView = "daily";
let currentViewMap = {
  daily: "Day",
  weekly: "Week",
  monthly: "Month"
}

let colorList = ["#ff8c66", "#56c2e6", "#ff5c7c", "#4acf81", "#7536d3", "#f1c65b"];
let imageList = ["./images/icon-work.svg", "./images/icon-play.svg", "./images/icon-study.svg", "./images/icon-exercise.svg", "./images/icon-social.svg", "./images/icon-self-care.svg"]

data.forEach((element, index) => {
  renderElements(element, index);
})

function renderElements(element, index) {
  let section = createSection(`
  <section class="rounded-xl overflow-hidden md:max-w-60 bg-[${colorList[index]}]">
  <img
    src="${imageList[index]}"
    alt="Icon"
    class="ml-auto mr-6 relative -mt- min-w-[79px] max-w-[79px] min-h-[79px] max-h-[79px] object-cover"
  />
  <div
    class="p-8 rounded-xl bg-[#1c1f4a] -mt-8 relative z-10 hover:bg-[#6f76c8] hover:cursor-pointer transition-colors"
  >
    <div class="flex justify-between items-center">
      <h2 class="text-[18px] text-white">${element.title}</h2>
      <img src="./images/icon-ellipsis.svg" alt="Ellipsis icon" />
    </div>
    <div
      class="flex justify-between items-baseline mt-2 md:block md:mt-4"
    >
      <h3 class="text-4xl text-white font-light md:text-5xl">${element.timeframes[currentView].current}hrs</h3>
      <p class="text-sm text-[#bdc1ff] md:mt-2">Last ${currentViewMap[currentView]} - ${element.timeframes[currentView].previous}hrs</p>
    </div>
  </div>
</section>
  `)
  gridWrapper.appendChild(section);
}

function createSection(html) {
  let template = document.createElement("template")
  template.innerHTML = html.trim()
  return template.content.firstElementChild
}

function changeView(view, btn) {
  currentView = view;
  const buttons = [dailyBtn, weeklyBtn, monthlyBtn]
  buttons.forEach(btn => {
    btn.id === currentView ? btn.classList.add("text-white") : btn.classList.remove("text-white")
  })
}

function updateSections() {
  const childrenToRemove = Array.from(gridWrapper.children).slice(1)
  childrenToRemove.forEach(child => child.remove())
  data.forEach((element, index) => {
    renderElements(element, index);
  })
}

dailyBtn.addEventListener("click", () => {
  changeView("daily")
  updateSections()
})
weeklyBtn.addEventListener("click", () => {
  changeView("weekly")
  updateSections()
})
monthlyBtn.addEventListener("click", () => {
  changeView("monthly")
  updateSections()
})
