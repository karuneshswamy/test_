function textSplitting(){
    var allH1=document.querySelectorAll("#page2 h1")

allH1.forEach(function(elem){
    var clutter = ""
    var h1text = elem.textContent
    var splittedtext = h1text.split("")
    splittedtext.forEach(function(e){
        clutter+= `<span>${e}</span>`
    })
    elem.innerHTML = clutter


})
}

function gsapanimation(){
    gsap.to("#page2 h1 span",{
        color:"#E3E3C4",
        stagger:0.1,
        scrollTrigger:{
            trigger:"#page2 h1",
            scroller:"#main",
            markers:true,
            start:"top 40%",
            end:"top -20%",
            scrub:1
        }
    })
}

function locoscroll(){
    gsap.registerPlugin(ScrollTrigger);

    // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll
    
    const locoScroll = new LocomotiveScroll({
      el: document.querySelector("#main"),
      smooth: true
    });
    // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
    locoScroll.on("scroll", ScrollTrigger.update);
    
    // tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
    ScrollTrigger.scrollerProxy(".smooth-scroll", {
      scrollTop(value) {
        return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
      }, // we don't have to define a scrollLeft because we're only scrolling vertically.
      getBoundingClientRect() {
        return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
      },
      // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
      pinType: document.querySelector(".smooth-scroll").style.transform ? "transform" : "fixed"
    });
    
    
    // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
    
    // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
    ScrollTrigger.refresh();
    
}

textSplitting()
gsapanimation()
locoscroll()
//for only 1 element

// var h1Text= document.querySelector("#firsth1").textContent

// var splitedText = h1Text.split("") //split() string ko divide krdega
// console.log(splitedText)


// var clutter = "" //made the clutter empty
// splitedText.forEach(function(elem){
//  clutter+=`<span>${elem}</span>`// every time data will be added to the clutter
// })

// document.querySelector("#firsth1").innerHTML = clutter