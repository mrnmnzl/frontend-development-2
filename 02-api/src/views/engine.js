import defaultLayout from "./layouts/default.hbs";

const mount = document.querySelector('#app');

export function render(view, context = {}, layout = defaultLayout) {
    const html = layout({view, ...context});
    mount.innerHTML = html;
}
