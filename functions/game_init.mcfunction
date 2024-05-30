playsound mob.wolf.death @a ~ ~100 ~ 1 0.5 1
#タイトルの表示時間設定
title @a times 20 100 20
title @a title §c～マイクラ人狼 ver.2.5.0～
#鈍化を与える
effect @a[tag=!gm] slowness 100 255 true
#盲目を与える
effect @a[tag=!gm] blindness 100 255 true
#プレイヤー全員待機場所へ移動
tp @a[tag=!gm] 232 4 -130

xp -9999L @a
gamerule pvp false
clear @a[tag=!gm]
gamemode a @a[tag=!gm]
kill @e[type=!player,x=192,y=54,z=-192,dx=115,dy=100,dz=130,type=!armor_stand,type=!minecart,type=!npc,type=!bat]
effect @a instant_health 1 200 true
##待機場所の初期化
clone 218 10 -111 270 14 -103 218 10 -135 
##アイテムや条件のコマブロ停止1
fill 200 4 -180 252 4 -180 air
##アイテムや条件のコマブロ停止2
fill 219 4 -167 252 4 -167 air
##アイテムや条件のコマブロ停止3
fill 219 4 -154 252 4 -154 air
##１秒タイマーの停止
setblock 212 4 -174 air
##２秒間ウェイト
setblock 280 4 -125 redstone_block
##ゲームスタートのボタンをはずす
setblock 277 5 -129 air
difficulty peaceful
gamerule naturalregeneration true
effect @a invisibility 300 0 true
fill 212 4 -166 214 4 -166 air
##人狼・村人勝利の停止
fill 212 4 -166 214 4 -166 air
##人狼勝利のリピーターを入れる
# setblock 212 4 -165 unpowered_repeater 2
setblock 212 4 -165 unpowered_repeater ["minecraft:cardinal_direction"="north"]
##村人勝利のリピーターを入れる
setblock 214 4 -165 unpowered_repeater ["minecraft:cardinal_direction"="north"]
##人狼勝利の停止
setblock 212 4 -159 air
##村人勝利の停止
setblock 214 4 -159 air
#役職のスコアボードの削除
scoreboard objectives remove team
# タイマーのスコアボードの削除
scoreboard objectives remove timer
#すべての役職タグ削除
function remove_all_tag
setblock 233 2 -132 air
setblock 234 2 -132 air