statusbars.onZero(StatusBarKind.Health, function (status) {
    game.gameOver(false)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Projectile, function (sprite, otherSprite) {
    statusbar.value += -10
    sprites.destroy(otherSprite)
})
scene.onHitWall(SpriteKind.Projectile, function (sprite, location) {
    sprites.destroy(sprite)
})
let bullet: Sprite = null
let direction = 0
let statusbar: StatusBarSprite = null
info.startCountdown(120)
let ballrate = 1000
tiles.setCurrentTilemap(tilemap`level1`)
let mySprite = sprites.create(img`
    ........................
    ........................
    ........................
    ........................
    ..........ffff..........
    ........ff1111ff........
    .......fb111111bf.......
    .......f11111111f.......
    ......fd11111111df......
    ......fd11111111df......
    ......fddd1111dddf......
    ......fbdbfddfbdbf......
    ......fcdcf11fcdcf......
    .......fb111111bf.......
    ......fffcdb1bdffff.....
    ....fc111cbfbfc111cf....
    ....f1b1b1ffff1b1b1f....
    ....fbfbffffffbfbfbf....
    .........ffffff.........
    ...........fff..........
    ........................
    ........................
    ........................
    ........................
    `, SpriteKind.Player)
controller.moveSprite(mySprite)
scene.cameraFollowSprite(mySprite)
statusbar = statusbars.create(20, 4, StatusBarKind.Health)
statusbar.setColor(7, 2)
statusbar.attachToSprite(mySprite)
statusbar.max = 100
statusbar.value = 100
game.onUpdate(function () {
    if (info.countdown() < 115) {
        ballrate = 500
    } else if (info.countdown() == 110) {
        ballrate = 250
    } else {
        ballrate = 100
    }
})
game.onUpdateInterval(ballrate, function () {
    direction = randint(1, 4)
    bullet = sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . 4 4 4 4 . . . . . . 
        . . . . 4 4 4 5 5 4 4 4 . . . . 
        . . . 3 3 3 3 4 4 4 4 4 4 . . . 
        . . 4 3 3 3 3 2 2 2 1 1 4 4 . . 
        . . 3 3 3 3 3 2 2 2 1 1 5 4 . . 
        . 4 3 3 3 3 2 2 2 2 2 5 5 4 4 . 
        . 4 3 3 3 2 2 2 4 4 4 4 5 4 4 . 
        . 4 4 3 3 2 2 4 4 4 4 4 4 4 4 . 
        . 4 2 3 3 2 2 4 4 4 4 4 4 4 4 . 
        . . 4 2 3 3 2 4 4 4 4 4 2 4 . . 
        . . 4 2 2 3 2 2 4 4 4 2 4 4 . . 
        . . . 4 2 2 2 2 2 2 2 2 4 . . . 
        . . . . 4 4 2 2 2 2 4 4 . . . . 
        . . . . . . 4 4 4 4 . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, SpriteKind.Projectile)
    if (direction == 1) {
        tiles.placeOnRandomTile(bullet, sprites.dungeon.greenOuterNorth0)
        bullet.setVelocity(0, 200)
    } else if (direction == 2) {
        tiles.placeOnRandomTile(bullet, sprites.dungeon.greenOuterEast0)
        bullet.setVelocity(-200, 0)
    } else if (direction == 3) {
        tiles.placeOnRandomTile(bullet, sprites.dungeon.greenOuterWest1)
        bullet.setVelocity(200, 0)
    } else {
        tiles.placeOnRandomTile(bullet, sprites.dungeon.greenOuterSouth0)
        bullet.setVelocity(0, -200)
    }
})
