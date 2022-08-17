const menu = [
    {
        id: 1,
        category: "breakfast",
        discount: 10,
        best_seller: "popular",
        start_time: "6:00 am",
        end_time: "10:30 am",
        name: "Vegan Shan Khao Swe",
        image: "images/Vegan-Shan-Khao-Swe.jpeg",
        price: 2000,
        desc: "This noodle is delicious, light and healthy and perfect served for dinner with turmeric-scented rice and a quick and easy chopped salad. Ingredients needed Extra-virgin olive oil. Garam Masala. Curry spice blend/curry powder. I used a store-bought blend that I use often but you can use any Indian spices of your choice…"
    },
    {
        id: 2,
        category: "breakfast",
        discount: "",
        start_time: "6:00 am",
        best_seller: "",
        end_time: "10:30 am",
        name: "Shan Noodles",
        image: "images/Shan-noodles.jpeg",
        price: 1800,
        desc: "I'm baby woke mlkshk wolf bitters live-edge blue bottle, hammock freegan copper mug whatever cold-pressed..."
    },
    {
        id: 3,
        category: "lunch",
        discount: 30,
        best_seller: "",
        start_time: "6:00 am",
        end_time: "10:30 am",
        name: "Coffee",
        image: "images/coffee.jpg",
        price: 1500,
        desc: "Shabby chic keffiyeh neutra snackwave pork belly shoreditch. Prism austin mlkshk truffaut,"
    },
    {
        id: 4,
        name: "egg attack",
        discount: "",
        best_seller: "popular",
        start_time: "10:00 am",
        end_time: "1:30 pm",
        category: "lunch",
        price: 1200,
        image:"images/egg.png",
        desc: `franzen vegan pabst bicycle rights kickstarter pinterest meditation farm-to-table 90's pop-up `,
    },
    {
        id: 5,
        name: "quarantine buddy",
        discount: "",
        best_seller: "popular",
        start_time: "4:00 pm",
        end_time: "6:00 pm",
        category: "dinner",
        price: 3500,
        image:
          "images/steak.jpg",
        desc: `skateboard fam synth authentic semiotics. Live-edge lyft af, edison bulb yuccie crucifix microdosing.`,
    },
]

const listing = document.querySelector(".menu-list");
const btns = document.querySelector(".btn-wrap");




window.addEventListener("DOMContentLoaded" , function(){
  
    displayMenuItem(menu);
    displayBtns();
    modal();
    menuMore();
    // showModal(id)
    
});



function displayMenuItem(menuItems){
   
    let displayMenu = menuItems.map(function(item){
        return ` <article class="menu-card">
                    <div class="img-wrap">
                        <img src=${ item.image } uk-img alt= ${ item.name }>
                        <span class="item-category uk-button"> ${ item.category }</span>
                        <span class="best-seller uk-button"> ${ item.best_seller }</span>
                    </div>
                   
                    <div class="menu-detail">

                        <div class="title-wrap uk-flex uk-flex-between">
                            <p class="title">${ item.name}</p>
                            <div class="uk-flex price-wrap">
                                <p class="discount"> ${ item.discount ? `Discount <span>${ item.discount }% <p class="price-with-dis">MMK ${ item.price.toLocaleString() }</p>` : `<p class="price">MMK ${ item.price.toLocaleString() }</p>` } </span> </p>
                                
                            </div>
                            
                        </div>
                        <p>Time Limit ${ item.start_time } - ${item.end_time}</p>
                        <p class="description"> ${ item.desc } </p>
                        <button data-id="${item.id}" class="uk-button btn modal-btn">Read More</button>
                    </div>
                </article>`;
               
    })
    displayMenu = displayMenu.join("");
    listing.innerHTML  = displayMenu;
}



function displayBtns(){
    const category = menu.reduce(function(value , item){
        if(!value.includes(item.category)){
            value.push(item.category);
        }
        return value;
    },
    ["all"]
    );

    const categoryBtns = category.map(function(category){
        return `<button data-id="${ category }" class="uk-button category-btn ">${ category }</button>`
    }).join("");

    btns.innerHTML = categoryBtns;

   

    filter()
    



}

function filter(){

    const filterBtn = document.querySelectorAll(".category-btn");
    const dataId = $(".category-btn").attr("data-id");
    console.log("DataID" , dataId);
    filterBtn.forEach(function(btn){
        btn.addEventListener("click" , function(e){
            $(".category-btn").removeClass("active");
            $(this).addClass("active");  
            const category = e.currentTarget.dataset.id;
            
            console.log(category);
            const menuCategory = menu.filter(function(menuItem){

                if(menuItem.category === category){
                    return menuItem;
                }

            });
            if(category === "all"){
                displayMenuItem(menu)
                
            }
            else{
                displayMenuItem(menuCategory);
              
            }
 

            /* !!!!! Modal !!!!! */
            modal()
            /* !!!!! End Modal !!!!! */
            console.log("Test");
            menuMore()

        });
    });

}

/* !!!!! Modal !!!!! */
function modal(){
    const modalBtn = document.querySelectorAll(".modal-btn");
    const modalOverlay = document.querySelector(".modal-overlay");
    const modalCloseBtn = document.querySelector(".close-btn");
    
        modalBtn.forEach(function(mBtn){
            mBtn.addEventListener("click" , function(e){
                e.preventDefault();
                let id = $(this).data('id');
                showModal(id);
                modalOverlay.classList.add("open-modal");
            });
        });
    
    
        modalCloseBtn.addEventListener("click" , function(){
            modalOverlay.classList.remove("open-modal");
        })
    
}
   


function showModal(id){
    let staticData = menu;
    let menuArray = new Array();

    jQuery.each(staticData , (index , value) => {
       menuArray.push(value);
    });
    

    let data = menuArray.find (function(result){
        if(result.id === id){
            return result;
        } 
    });

    let template = `
        <div class="left-image" style="background-image: url( ${ data.image } )">
          
        </div>
        <div class="detail">
            <p class="name">${ data.name}</p>
            <p>MMK ${ data.price.toLocaleString()}</p>
            <p>${ data.desc }</p>
            <button class="order-now uk-button">Order Now (Coming)</button>
        </div>
    `;

    console.log("Template"  , {template});

    $('[data-render="popup"]').html('');
    $(template).appendTo('[data-render="popup"]');

   
}

function menuMore(){

    $("article:hidden").slice(0 , 1).addClass("displayMore");
        
    if($("article:hidden").length === 0){
        $('#loadMore').css('display','none');
    }
    else{
        $('#loadMore').css('display','block');
        $('html , body').animate({
            screenTop: $("#loadMore").offset().top
        }, 900);
        }

}

$(document).ready(function(){
    $("article").slice(0 , 1).addClass("displayMore");
    $("#loadMore").on("click" , function(e){
        e.preventDefault();
        menuMore()
    });
})
    
    

 



// !!!!!!User Review 


const userDescription = [
    {
        id: 1,
        img: "images/aiony-haust.jpg",
        name: "Aiony Haust",
        position: "Customer",
        review: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto asperiores debitis incidunt, eius earum ipsam cupiditate libero?"        
    },
    {
        id: 2,
        img: "images/kirill.jpg",
        name: "Kirill",
        position: "VIP",
        review: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto asperiores debitis incidunt, eius earum ipsam cupiditate libero?"        
    },
    {
        id: 3,
        img: "images/michael.jpg",
        name: "Michael",
        position: "VVIP",
        review: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto asperiores debitis incidunt, eius earum ipsam cupiditate libero?"        
    },
    {
        id: 4,
        img: "https://res.cloudinary.com/diqqf3eq2/image/upload/v1586883409/person-2_np9x5l.jpg",
        name: "User 1",
        position: "Customer",
        review: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto asperiores debitis incidunt, eius earum ipsam cupiditate libero?"        
    },
    {
        id: 5,
        img: "https://res.cloudinary.com/diqqf3eq2/image/upload/v1586883334/person-1_rfzshl.jpg",
        name: "User 2",
        position: "Customer",
        review: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto asperiores debitis incidunt, eius earum ipsam cupiditate libero?"        
    },
]

const image = document.querySelector("#profile");
const profileName = document.querySelector("#name");
const position = document.querySelector("#position");
const review = document.querySelector("#review");

const prevBtn = document.querySelector(".prev-btn");
const nextBtn = document.querySelector(".next-btn");

let currentItem = 0;

window.addEventListener("DOMContentLoaded", function () {
    const item = userDescription[currentItem];
    console.log("Item" , item);
    image.src = item.img;
    profileName.textContent = item.name;
    position.textContent = item.position;
    review.textContent = item.review;
    // const text = node.textContent;
});

function showPerson(person){
    const item = userDescription[person];
    image.src = item.img;
    profileName.textContent = item.name;
    position.textContent = item.position;
    review.textContent = item.review;
}

prevBtn.addEventListener("click" , function(){
    currentItem--;
    if(currentItem < 0){
        currentItem = userDescription.length - 1;
    }
    showPerson(currentItem);
});

nextBtn.addEventListener("click" ,function(){
    currentItem++;
    if(currentItem > userDescription.length - 1){
        currentItem = 0;
    }
    showPerson(currentItem);
})


// Video Pause 

const switchBtn = document.querySelector(".switch-btn");
const video = document.querySelector(".video-container");

switchBtn.addEventListener("click" , function(){
    if(!switchBtn.classList.contains("slide")){
        switchBtn.classList.add("slide");
        video.pause();
    }
    else{
        switchBtn.classList.remove("slide");
        video.play();
    }

})




