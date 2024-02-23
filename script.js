const game = {
    RAMCharacters: [],
    score: [0],

    async createArray() {

        const lastPageOfApi = 42

        for (let page = 1; page <= lastPageOfApi; page++) {

            try {

                const response = await
                    fetch(`https://rickandmortyapi.com/api/character/?page=${page}`)

                if (!response.ok) {
                    throw "Request Error"
                }

                const data = await response.json()

                const results = data.results

                results.forEach(character => {

                    if (character.status !== 'unknown') {

                        this.RAMCharacters.push({
                            name: character.name,
                            status: character.status,
                            imageUrl: character.image,
                        })
                    }
                })
            } 

            catch (err) {

                console.log(err)

            }
        }
    },

    renderGame() {

        const divOfTheGame = document.querySelector(".game")

        divOfTheGame.innerHTML = ""

        const gameDisplay = this.createGameDisplay()
        const scoreDisplay = this.createScoreDisplay()

        divOfTheGame.append(scoreDisplay, gameDisplay)
    },

    createGameDisplay() {

        const character = this.selectRandomCharacter()
        const isAlive = character.status === "Alive" ? true : false

        const displayDiv = document.createElement("div")
        displayDiv.id="game-div"

        const image = document.createElement("img")
        image.src = character.imageUrl
        image.alt = `${character.name} Image`

        const name = document.createElement("span")
        name.innerText = character.name

        const buttonsDiv = document.createElement("div")
        buttonsDiv.classList.add("buttons-div")

        const isAliveBtn = this.createButton(isAlive, "Alive")
        const isDiedBtn = this.createButton(isAlive, "Died")

        buttonsDiv.append(isAliveBtn, isDiedBtn)

        displayDiv.append(image, name, buttonsDiv)

        return displayDiv
    },

    createButton(isAlive, type) {

        const newButton = document.createElement("button")

        if (type === "Alive") {

            newButton.innerText = "Alive"
            newButton.addEventListener("click", () => {

                if (isAlive) {

                    let scoreValue = this.score[0]
                    scoreValue++

                    this.score[0]++
                    this.renderGame()

                } 
                
                else {

                    this.renderGame()

                }
            })
        } 
        else {

            newButton.innerText = "Died"
            newButton.addEventListener("click", () => {

                if (!isAlive) {

                    let scoreValue = this.score[0]
                    scoreValue++

                    this.score[0]++
                    this.renderGame()

                } 
                else {

                    this.renderGame()

                }
            })
        }
        return newButton
    },

    createScoreDisplay() {

        const scoreDiv = document.createElement("div")
        scoreDiv.id="score-div"

        const scoreNumber = document.createElement("span")
        scoreNumber.innerText = this.score[0]

        scoreDiv.appendChild(scoreNumber)

        return scoreDiv
    },

    selectRandomCharacter() {

        const size = this.RAMCharacters.length

        const randomCharacterIndex = parseInt(Math.random() * size)

        const Character = this.RAMCharacters[randomCharacterIndex]

        return Character
    }
}

game.createArray().then(() => {

    document.querySelector(".loading").style.display = "none"
    game.renderGame()

})