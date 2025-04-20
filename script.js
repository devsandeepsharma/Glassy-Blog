const button = document.getElementById("toggle-button");
const body = document.getElementById("body");

button.addEventListener("click", toggleTheme);

async function toggleTheme() {
    if (!document.startViewTransition || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        body.classList.toggle('dark-mode');
        return;
    }

    const { top, left, width, height } = button.getBoundingClientRect();
    const x = left + width / 2;
    const y = top + height / 2;

    const right = window.innerWidth - left;
    const bottom = window.innerHeight - top;
    const maxRadius = Math.hypot(Math.max(left, right), Math.max(top, bottom));

    await document.startViewTransition(() => {
        body.classList.toggle('dark-mode');
    }).ready;

    document.documentElement.animate(
        {
            clipPath: [
                `circle(0px at ${x}px ${y}px)`,
                `circle(${maxRadius}px at ${x}px ${y}px)`,
            ],
        },
        {
            duration: 500,
            easing: 'ease-in-out',
            pseudoElement: '::view-transition-new(root)',
        }
    );
}