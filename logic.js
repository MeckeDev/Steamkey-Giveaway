var game_keys = require(__dirname + '/keys.json')
const fs = require("fs")
const copy = require('copy-to-clipboard')

function load_games(search=null, edit=false){
    
    var game_keys = require(__dirname + "/keys.json")

    var names = Object.keys(game_keys)

    if(names.length <= 0){

        document.getElementById("gameslist").innerHTML = `
<div style="font-size: 32px;" class="w-100 bg-warning text-center rounded p-3 mt-5">Keine Gamekeys gespeichert</div>
    `

    }
    
    else{
        var html = `
        <style>
        .my-custom-scrollbar {
            position: relative;
            height: 45vh;
            overflow: auto;
            }
            .table-wrapper-scroll-y {
            display: hidden;
            }
        </style>
        <div class="table-wrapper-scroll-y my-custom-scrollbar mt-5">
            <table class="table table-dark table-striped text-center">
                <tbody>`
        
                if(search){
                    for(game in names){
                        if(names[game].includes(search)){
                            html += `
                            <tr>
                                <td class="w-75 align-middle lh-1" >${names[game]}</td>
                                <td class="align-middle lh-1" ><button type="button" onclick="get_key('${names[game]}')" class="btn btn-primary mb-3">Copy Code</button></td>
                                <td class="align-middle lh-1" ><button type="button" onclick="edit_game('${names[game]}')" class="btn btn-warning mb-3">Bearbeiten</button></td>
                                <td class="align-middle lh-1" ><button type="button" onclick="remove_game('${names[game]}')" class="btn btn-danger mb-3">Löschen</button></td>
                            </tr>`
                        }    
                    }
                }
                else{
                    for(game in names){
        
                        html += `
                            <tr>
                                <td class="w-75 align-middle lh-1" >${names[game]}</td>
                                <td class="align-middle lh-1" ><button type="button" onclick="get_key('${names[game]}')" class="btn btn-primary mb-3">Copy Code</button></td>
                                <td class="align-middle lh-1" ><button type="button" onclick="edit_game('${names[game]}')" class="btn btn-warning mb-3">Bearbeiten</button></td>
                                <td class="align-middle lh-1" ><button type="button" onclick="remove_game('${names[game]}')" class="btn btn-danger mb-3">Löschen</button></td>
                            </tr>`
                
                    }
                }
        
                if (edit){
                    html = `
                    <div class="w-100 bg-secondary form-floating mt-3 rounded">
                            <h1 class="w-100 text-center"> Edit Game: ${search} </h1>
                            <input style="width:46%" type="text" class="form-control float-left mx-3 text-center" id="gamename_r" value="${search}">
                            <input for="floatingTextarea" style="width:46%" type="text" class="form-control float-left mr-2 text-center" id="gamekey_r" value="${game_keys[search]}">
        
                            <button style="width:46%" type="button" onclick="edit_key('${search}')" class="btn btn-success my-3 ml-3">Speichern</button>
                            <button style="width:46%" type="button" onclick="location.href='./index.html'" class="btn float-left bg-danger my-3 ml-3">Abbrechen</button>
                    </div>
                        `
                }
        
                html += `
            </tbody>
        </table>
        </div>`
        
            document.getElementById("gameslist").innerHTML = html
    }
    

}

async function remove_game(game){
    var game_keys = require(__dirname +'/keys.json')

    delete game_keys[game]

    const data = JSON.stringify(game_keys, null, 4);

    fs.writeFile(__dirname +'/keys.json', data, (err) => {
        if (err) {
            throw err;
        }
    });

    location.reload()

}

async function edit_key(game){

    var game_keys = require(__dirname +'/keys.json')

    const name = document.getElementById("gamename_r").value.toLowerCase()
    const key = document.getElementById("gamekey_r").value

    if (game !== name) {
        Object.defineProperty(game_keys, name,
            Object.getOwnPropertyDescriptor(game_keys, game));
        delete game_keys[game]
    }

    game_keys[name] =  key

    const data = JSON.stringify(game_keys, null, 4);

    fs.writeFile(__dirname +'/keys.json', data, (err) => {
        if (err) {
            throw err;
        }
    });

    location.reload()
}

function get_key(game=false){
    
    var game_keys = require(__dirname +'/keys.json')

    if(!game){
        var names = Object.keys(game_keys)
        var name = names[Math.floor(Math.random() * names.length)]
        copy(game_keys[name].toUpperCase())
    
        document.getElementById("r_game").value = `Key für - ${name} - in Zwischenablage`
    }
    else{
        copy(game_keys[game].toUpperCase())
        document.getElementById("r_game").value = `Key für - ${game} - in Zwischenablage`
    }

}

async function edit_game(game){
    
    load_games(game, true)

}

async function check_values(){
    
    var game_keys = require(__dirname +'/keys.json')

    var name = document.getElementById("gamename").value.toLowerCase()
    var key = document.getElementById("gamekey").value
    var btn = document.getElementById("addgame")

    if(name in game_keys){
        btn.disabled = true
    }
    else{
        btn.disabled = false
    }

    if(key == "" || name == ""){
        btn.disabled = true
    }
}

async function save_key(){

    var game_keys = require(__dirname +'/keys.json')

    var name = document.getElementById("gamename").value.toLowerCase()
    var key = document.getElementById("gamekey").value

    game_keys[name] = key

    const data = JSON.stringify(game_keys, null, 4);

    fs.writeFile(__dirname +'/keys.json', data, (err) => {
        if (err) {
            throw err;
        }
    });

    location.reload()
}