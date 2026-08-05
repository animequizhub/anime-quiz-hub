const currentTheme =
localStorage.getItem("theme") || "dark";

document.documentElement.setAttribute(
"data-theme",
currentTheme
);

export function setTheme(theme){

localStorage.setItem("theme",theme);

document.documentElement.setAttribute(
"data-theme",
theme
);

}