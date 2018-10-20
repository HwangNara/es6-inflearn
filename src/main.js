class Blog {
    constructor() {
        this.setInitVariables()
        this.registerEvents()
        this.likedSet = new Set()
    }

    setInitVariables() {
        this.blogList = document.querySelector(".blogList > ul")
    }

    registerEvents() {
        const dataUrl = "/data/data.json"
        const startBtn = document.querySelector(".start");
        

        
        startBtn.addEventListener("click", () => {
            this.setInitData(dataUrl)
        })

        this.blogList.addEventListener("click", ({target}) => {
            const targetClassName = target.className
            if (targetClassName !== "like" && targetClassName !== "unlike") return

            const postTitle = target.previousElementSibling.textContent

            if (targetClassName === "unlike") {
                target.className = "like"
                target.innerText = "찜하기"
                this.likedSet.delete(postTitle)
            } else {
                target.className = "unlike"
                target.innerText = "찜취소"
                this.likedSet.add(postTitle)
            }
            this.updateLikedList()
        })
    }
    
    updateLikedList() {
        const ul = document.querySelector(".like-list > ul")
        let likedSum = ""
        this.likedSet.forEach( (v) => {
            likedSum += `
                <li> ${v} </li>
            `
        })
        ul.innerHTML = likedSum
    }

    setInitData(dataUrl) {
        this.getData(dataUrl, this.insertPosts.bind(this))
    }

    getData(dataUrl, fn) {
        const oReq = new XMLHttpRequest()

        oReq.addEventListener("load", () => {
            const list = JSON.parse(oReq.responseText).body
            fn(list)
        })

        oReq.open('GET', dataUrl)
        oReq.send()
    }

    insertPosts(list) {
        list.forEach(v => {
            this.blogList.innerHTML += `
                <li> 
                  <a href=${v.link}> ${v.title}</a>
                  <div class="like">찜하기</div>
                </li>
            `
        })
    }
    
}

export default Blog