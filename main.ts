namespace SpriteKind {
    export const range = SpriteKind.create()
    export const Boss = SpriteKind.create()
    export const bomb = SpriteKind.create()
    export const trigger = SpriteKind.create()
    export const unlock = SpriteKind.create()
    export const Chip = SpriteKind.create()
    export const BossAttacks = SpriteKind.create()
    export const key = SpriteKind.create()
    export const door = SpriteKind.create()
    export const speed_p_up = SpriteKind.create()
    export const Merchant = SpriteKind.create()
    export const Chip2 = SpriteKind.create()
}
/**
 * info doc is
 * 
 * https://docs.google.com/document/d/1eHrQQx9AimDJX6TYyEVmUonGq4omSS44agndvsJoUjI/edit?usp=sharing
 */
sprites.onOverlap(SpriteKind.Player, SpriteKind.Chip, function (sprite, otherSprite) {
	
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Chip2, function (sprite, otherSprite) {
    MintGrabbed = true
})
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    projectile = sprites.create(assets.image`myImage`, SpriteKind.Projectile)
    pause(1000)
    projectile.setImage(assets.image`boom`)
    Growing(projectile, 5)
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    attack = true
    if (MintGrabbed == true) {
        animation.runImageAnimation(
        Player,
        assets.animation`myAnim_02`,
        100,
        false
        )
        pause(900)
    } else {
        animation.runImageAnimation(
        Player,
        assets.animation`myAnim`,
        300,
        false
        )
        pause(2000)
    }
    attack = false
    animation.stopAnimation(animation.AnimationTypes.All, Player)
    Player.setImage(assets.image`Player`)
    pause(500)
})
function ReloadRoom () {
    LEVELCHANGE = true
}
function BossManager () {
    if (Broadcasthealth <= 0) {
        Boss_Dead(myBoss)
    } else {
        pause(500)
        BossAttackManager()
    }
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.BossAttacks, function (sprite, otherSprite) {
    Ending()
})
function Chips (_: number) {
    if (_ == 1) {
        MintGrabbed = true
    } else {
    	
    }
    pause(500)
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Projectile, function (sprite, otherSprite) {
    if (attack == true) {
        sprites.destroy(otherSprite)
    } else {
        sprites.destroy(otherSprite)
        Ending()
    }
    pause(1000)
})
function Ending () {
    game.gameOver(false)
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.door, function (sprite, otherSprite) {
    if (Player.overlapsWith(mySprite)) {
        LEVELCHANGE = true
        if (controller.B.isPressed()) {
            if (Room == 1) {
                Room += 0
            } else {
                Room += -1
            }
        } else {
            if (Room == 5) {
                Room += 0
            } else {
                Room += 1
            }
        }
    }
    pause(300)
})
function RoomLoading (LoadRoom: number) {
    if (LoadRoom == 1) {
        tiles.setCurrentTilemap(tilemap`level 1`)
        tiles.placeOnRandomTile(mySprite, assets.tile`myTile13`)
        tiles.placeOnRandomTile(Player, assets.tile`myTile13`)
        sprites.destroy(mySprite3)
    } else if (LoadRoom == 2) {
        tiles.setCurrentTilemap(tilemap`level 2`)
        tiles.placeOnRandomTile(mySprite, assets.tile`Tiles`)
        tiles.placeOnRandomTile(Player, assets.tile`Tiles0`)
        mySprite3 = sprites.create(assets.image`Sea monsters0`, SpriteKind.Merchant)
        tiles.placeOnRandomTile(mySprite3, assets.tile`myTile`)
    } else if (LoadRoom == 3) {
        sprites.destroy(mySprite3)
        tiles.setCurrentTilemap(tilemap`level 3`)
        tiles.placeOnRandomTile(mySprite, assets.tile`Tiles0`)
        tiles.placeOnRandomTile(Player, assets.tile`Tiles`)
    } else if (LoadRoom == 4) {
        tiles.setCurrentTilemap(tilemap`level 4`)
        tiles.placeOnRandomTile(mySprite, assets.tile`myTile6`)
        tiles.placeOnRandomTile(Player, assets.tile`Tiles`)
    } else {
        tiles.setCurrentTilemap(tilemap`level Boss`)
        tiles.placeOnRandomTile(Player, assets.tile`myTile13`)
        tiles.placeOnRandomTile(myBoss, assets.tile`myTile13`)
        BossAttackManager()
    }
    pause(100)
    LEVELCHANGE = false
}
controller.menu.onEvent(ControllerButtonEvent.Pressed, function () {
    if (info.score() < 5) {
        Room = 5
        ReloadRoom()
    }
})
function Boss_Dead (Boss: Sprite) {
    sprites.destroy(Boss)
}
function BossAttackManager () {
    BossAttack = randint(3, 4)
    if (BossAttack == 1 || BossAttack == 2) {
        // Slash Attack
        // 
        // Spawns a slash the follows you for a few seconds
        animation.runImageAnimation(
        myBoss,
        assets.animation`Explosion`,
        200,
        false
        )
    } else if (BossAttack == 3) {
        // Explosion Attack
        // Functions used
        // -Timer
        // -Growing
        animation.runImageAnimation(
        myBoss,
        assets.animation`Explosion`,
        200,
        false
        )
        pause(2600)
        myBoss.setImage(assets.image`Sea monsters`)
        mySprite2 = sprites.create(assets.image`boom`, SpriteKind.BossAttacks)
        tiles.placeOnTile(mySprite2, myBoss.tilemapLocation())
        Growing(mySprite2, randint(1, 5))
    } else {
        // illusion Attack
        //   Spawns a twisted version of a past enemy 
        animation.runImageAnimation(
        myBoss,
        assets.animation`Portal`,
        200,
        false
        )
        Illusion = sprites.create(assets.image`myImage2`, SpriteKind.BossAttacks)
        PLayerX = Player.x
        PLayerY = Player.y
        pause(1000)
        Illusion.setPosition(PLayerX, PLayerY)
        pause(3000)
        myBoss.setImage(assets.image`Sea monsters`)
        sprites.destroy(Illusion)
    }
    BossManager()
}
function Growing (GrowingSprite: Sprite, Times: number) {
    for (let index = 0; index < Times; index++) {
        GrowingSprite.changeScale(1.5, ScaleAnchor.Middle)
        pause(500)
    }
    sprites.destroy(GrowingSprite)
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Merchant, function (sprite, otherSprite) {
    Chips(game.askForNumber("1 or 2"))
    pause(500)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Boss, function (sprite, otherSprite) {
    if (attack == true) {
        Broadcasthealth += -1
    } else {
        Ending()
    }
    pause(1000)
})
let PLayerY = 0
let PLayerX = 0
let Illusion: Sprite = null
let mySprite2: Sprite = null
let BossAttack = 0
let mySprite3: Sprite = null
let attack = false
let projectile: Sprite = null
let myBoss: Sprite = null
let mySprite: Sprite = null
let Player: Sprite = null
let MintGrabbed = false
let Broadcasthealth = 0
let Room = 0
let LEVELCHANGE = false
LEVELCHANGE = false
Room = 1
Broadcasthealth = 60
MintGrabbed = false
tiles.setCurrentTilemap(tilemap`level 1`)
Player = sprites.create(assets.image`Player`, SpriteKind.Player)
controller.moveSprite(Player, 500, 500)
scene.cameraFollowSprite(Player)
tiles.placeOnRandomTile(Player, assets.tile`myTile`)
mySprite = sprites.create(assets.image`myImage12`, SpriteKind.door)
tiles.placeOnRandomTile(mySprite, assets.tile`myTile13`)
mySprite.setScale(2, ScaleAnchor.Middle)
animation.runImageAnimation(
mySprite,
assets.animation`portal`,
200,
true
)
myBoss = sprites.create(assets.image`Sea monsters`, SpriteKind.Boss)
forever(function () {
    info.setScore(Room)
    if (LEVELCHANGE == true) {
        RoomLoading(Room)
    }
})
