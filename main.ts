namespace SpriteKind {
    export const house = SpriteKind.create()
    export const box = SpriteKind.create()
    export const goal = SpriteKind.create()
    export const Title = SpriteKind.create()
}
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.house, function (sprite, otherSprite) {
    delivered = 1
    mySprite2.setImage(img`
        . . . . f f f f . . . . 
        . . f f e e e e f f . . 
        . f f e e e e e e f f . 
        f f f f 4 e e e f f f f 
        f f f 4 4 4 e e f f f f 
        f f f 4 4 4 4 e e f f f 
        f 4 e 4 4 4 4 4 4 e 4 f 
        f 4 4 f f 4 4 f f 4 4 f 
        f e 4 d d d d d d 4 e f 
        . f e d d b b d d e f . 
        . f f e 4 4 4 4 e f f . 
        e 4 f b 1 1 1 1 b f 4 e 
        4 d f 1 1 1 1 1 1 f d 4 
        4 4 f 6 6 6 6 6 6 f 4 4 
        . . . f f f f f f . . . 
        . . . f f . . f f . . . 
        `)
    spr_box.destroy(effects.coolRadial, 200)
    animation.runImageAnimation(
    mySprite2,
    assets.animation`villager3WalkFront`,
    100,
    true
    )
    mySprite2.follow(spr_player)
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (gameStarted) {
        if (!(deliveryGuyLeavesVan)) {
            mySprite2 = sprites.create(assets.image`delivery`, SpriteKind.Projectile)
            spr_box = sprites.create(assets.image`box`, SpriteKind.box)
            animation.runImageAnimation(
            mySprite2,
            assets.animation`villager3WalkBack`,
            100,
            true
            )
            mySprite2.setPosition(spr_player.x, spr_player.y)
            mySprite2.setFlag(SpriteFlag.AutoDestroy, true)
            spr_box.setPosition(spr_player.x, spr_player.y + -10)
            mySprite2.setVelocity(0, -80)
            spr_box.setVelocity(0, -80)
            mySprite2.z = -1
            spr_box.z = -1
            deliveryGuyLeavesVan = 1
        }
    } else {
        if (!(showInfo)) {
            ShowGameInfo()
        }
    }
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Player, function (sprite, otherSprite) {
    if (delivered) {
        info.changeScoreBy(1)
        mySprite2.destroy()
    }
})
function ShowGameInfo () {
    title.destroy(effects.spray, 500)
    spr_info_01 = textsprite.create("Deliver tech to", 0, 15)
    spr_info_01.setPosition(54, 17)
    pause(1000)
    spr_info02 = textsprite.create("underprivileged children", 0, 15)
    spr_info02.setPosition(80, 32)
    pause(1000)
    spr_player = sprites.create(assets.image`truck`, SpriteKind.Player)
    animation.runImageAnimation(
    spr_player,
    assets.animation`truckAnim`,
    200,
    true
    )
    spr_player.setPosition(-20, 70)
    spr_player.setVelocity(50, 0)
    pause(1000)
    spr_player.setVelocity(0, 0)
    pause(1000)
    spr_info_01.destroy(effects.spray, 500)
    spr_info02.destroy(effects.spray, 500)
    pause(1000)
    spr_3 = textsprite.create("3", 0, 15)
    spr_3.changeScale(4, ScaleAnchor.Middle)
    spr_3.setPosition(76, 29)
    pause(1000)
    spr_3.destroy()
    spr_2 = textsprite.create("2", 0, 15)
    spr_2.changeScale(4, ScaleAnchor.Middle)
    spr_2.setPosition(76, 29)
    pause(1000)
    spr_2.destroy()
    spr_1 = textsprite.create("1", 0, 15)
    spr_1.changeScale(4, ScaleAnchor.Middle)
    spr_1.setPosition(79, 29)
    pause(1000)
    spr_1.destroy()
    spr_GO = textsprite.create("GO", 0, 15)
    spr_GO.changeScale(4, ScaleAnchor.Middle)
    spr_GO.setPosition(76, 29)
    pause(1000)
    spr_GO.destroy()
    gameStarted = 1
    StartGame()
}
function createHouses (amount: number) {
    for (let index = 0; index <= amount; index++) {
        HouseSprList.push(sprites.create(houseImageList._pickRandom(), SpriteKind.house))
        HouseSprList[index].setPosition(houseStartxPos + 80 * index, 28)
        HouseSprList[index].z = -2
        HouseSprList[index].setVelocity(scrollSpeed, 0)
        if (index == amount) {
            Finish = sprites.create(assets.image`img_finish`, SpriteKind.goal)
            Finish.setPosition(houseStartxPos + 70 + 80 * index, 80)
            Finish.setVelocity(scrollSpeed, 0)
            Finish.z = -2
        }
    }
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.goal, function (sprite, otherSprite) {
    game.over(true)
})
sprites.onDestroyed(SpriteKind.box, function (sprite) {
    music.baDing.play()
})
function StartGame () {
    createHouses(5)
    controller.moveSprite(spr_player, 100, 100)
    spr_player.setStayInScreen(true)
}
function constants () {
    delivered = 0
    deliveryGuyLeavesVan = 0
    scrollSpeed = -80
    houseStartxPos = 200
    houseAmount = 6
    houseImageList = [assets.image`house_01`]
    HouseSprList = []
    scene.setBackgroundImage(assets.image`cityscape2`)
    title = sprites.create(assets.image`Title`, SpriteKind.Title)
    title.z = 10
    scroller.scrollBackgroundWithSpeed(scrollSpeed, 0)
}
sprites.onDestroyed(SpriteKind.Projectile, function (sprite) {
    deliveryGuyLeavesVan = 0
    delivered = 0
    music.jumpUp.play()
})
let houseAmount = 0
let Finish: Sprite = null
let scrollSpeed = 0
let houseStartxPos = 0
let houseImageList: Image[] = []
let HouseSprList: Sprite[] = []
let spr_GO: TextSprite = null
let spr_1: TextSprite = null
let spr_2: TextSprite = null
let spr_3: TextSprite = null
let spr_info02: TextSprite = null
let spr_info_01: TextSprite = null
let title: Sprite = null
let deliveryGuyLeavesVan = 0
let gameStarted = 0
let spr_player: Sprite = null
let spr_box: Sprite = null
let mySprite2: Sprite = null
let delivered = 0
let showInfo = 0
showInfo = 0
constants()
game.onUpdate(function () {
	
})
