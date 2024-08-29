// 기존 애니메이션 스크립트
const images = document.querySelectorAll('.image-container');
let overlayActive = false;
let focusedContainer = null;

images.forEach(imageContainer => {
    const image = imageContainer.querySelector('img');
    
    imageContainer.addEventListener('click', (e) => {
        e.stopPropagation(); // 클릭 이벤트가 body로 전파되는 것을 막음
        if (!overlayActive) {
            focusedContainer = imageContainer;
            imageContainer.classList.add('active'); // 클릭된 이미지에 active 클래스 추가
            gsap.to(imageContainer, {
                duration: 0.8,
                x: window.innerWidth / 2 - imageContainer.getBoundingClientRect().left - imageContainer.offsetWidth / 2,
                y: window.innerHeight / 2 - imageContainer.getBoundingClientRect().top - imageContainer.offsetHeight / 2,
                scale: 2,
                zIndex: 1000,
                ease: "power3.out"
            });

            gsap.to("body", { 
                duration: 0.8, 
                backgroundColor: "rgba(0, 0, 0, 0.9)", 
                ease: "power3.out" 
            });

            overlayActive = true;
        }
    });
});

document.body.addEventListener('click', () => {
    if (overlayActive && focusedContainer) {

        gsap.to(focusedContainer, {
            duration: 0.8,
            x: 0,
            y: 0,
            scale: 1,
            zIndex: 1,
            ease: "power3.inOut"
        });

        gsap.to("body", { 
            duration: 0.8, 
            backgroundColor: "black", 
            ease: "power3.inOut" 
        });

        focusedContainer.classList.remove('active'); // 이미지에서 active 클래스 제거
        overlayActive = false;
        focusedContainer = null;
    }
});

const canvas1 = document.querySelector("#canvas1");

// Set canvas size to fit the real size
const rect1 = canvas1.getBoundingClientRect();
canvas1.width = rect1.width;
canvas1.height = rect1.height;

const raindropFx1 = new RaindropFX({
    canvas: canvas1,
    background: "back.jpg",
});

raindropFx1.start();

// Resize the effect renderer
window.onresize = () =>
{
    const rect1 = canvas1.getBoundingClientRect();
    raindropFx1.resize(rect1.width, rect1.height);

}

const back2 = document.getElementById('back2');

document.addEventListener('mousemove', (e) => {
    const back2Rect = back2.getBoundingClientRect();
    const x = e.clientX - back2Rect.left;
    const y = e.clientY - back2Rect.top;

    // 범위 내에 있는지 체크 (width와 height가 모두 0보다 큰지 확인)
    if (x >= 0 && y >= 0 && x <= back2Rect.width && y <= back2Rect.height) {
        back2.style.clipPath = `circle(14% at ${x}px ${y}px)`;
        back2.classList.add('highlight');
    } else {
        back2.classList.remove('highlight');
    }
});
