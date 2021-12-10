gsap.registerPlugin(ScrollTrigger)
let locoScroll = new LocomotiveScroll({
    el: document.body,
    smooth: true,
    multiplier: 1.9
})

locoScroll.on("scroll", ScrollTrigger.update)
ScrollTrigger.scrollerProxy(document.body, {
    scrollTop(value){
        return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
    },
    getBoundingClientRect(){
        return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
    },
    pinType: document.body.style.transform ? "transform" : "fixed"
});

gsap.to('.nav', {
    scrollTrigger: {
        trigger: "section.without",
        start: "middle",
        scroller: "section.without",
        scrub: true,
        markers: false,
    },
    background: '#19312E',
    paddingTop: '20px',
    paddingBottom: '20px'
    // color: 'black'
})


let navEle = document.querySelector('.mob-nav')
let lines = document.querySelectorAll('.burger > .nline')
let status = false
let burger = document.querySelector('.burger')
burger.addEventListener('click', () => {
    if (!status) {
        showNav()
        console.log('here')
    }
    else {
        hideNav()
    }
})

let showNav = () => {
    status = true
    gsap.to(lines[0], {
        top: 0,
        rotate: "45deg",
        duration: 0.1,
    })
    gsap.to(lines[1], {
        top: "90%",
        rotate: "-45deg",
        duration: 0.1,
        delay: -0.1
    })

    gsap.to(navEle, {
        clipPath: "ellipse(200% 110% at 50% 0%)",
        duration: 0.6,
        onComplete: () => {
            navEle.style.pointerEvents = "all"
        }
    })
}

let hideNav = () => {
    status = false
    gsap.to(lines[0], {
        top: "40%",
        rotation: 0,
        duration: 0.1
    })
    gsap.to(lines[1], {
        top: "80%",
        rotation: 0,
        duration: 0.1,
        delay: -0.1
    })

    gsap.to(navEle, {
        clipPath: "ellipse(0% 0% at 50% 0%)",
        delay: 0.1,
        duration: 0.6,
        onComplete: () => {
            navEle.style.pointerEvents = "none"
        }
    })
}

let links = document.querySelectorAll('.mob-nav > .links > button')

links.forEach(link => {
    link.addEventListener('click', hideNav)
})

gsap.to('.yeah > .left-line > .left-block', {
    scrollTrigger: {
        trigger: '.yeah',
        scrub: true,
        scroller: '.yeah',
        start: "top top",
    },
    top: "90%"
})

gsap.to('.yeah > .right-line > .right-block', {
    scrollTrigger: {
        trigger: '.yeah',
        scrub: true,
        scroller: '.yeah',
        start: "top top",
    },
    top: "60%"
})

// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();