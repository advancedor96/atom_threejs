let container = document.querySelector('#container');

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );

// 用滑鼠控制視角，直接copy
var controls = new THREE.OrbitControls( camera );


var group = new THREE.Object3D()
var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
container.appendChild( renderer.domElement );

// 中間的球
var geometry = new THREE.SphereBufferGeometry( 1, 32, 32 );
var material = new THREE.MeshLambertMaterial( {color: 0xc9c9c9});
var center = new THREE.Mesh( geometry, material );
scene.add( center );

// 藍環
var blue_ring_geo = new THREE.RingBufferGeometry( 9.7, 10, 64 );
var blue_ring_material = new THREE.MeshLambertMaterial( {color: 0x0000ff, side: THREE.DoubleSide} );
var blue_ring = new THREE.Mesh( blue_ring_geo, blue_ring_material );
blue_ring.rotation.x = Math.PI/2;
scene.add( blue_ring );
group.add(blue_ring)

// 藍球
var blue_ball_geo = new THREE.SphereBufferGeometry( 1, 32, 32);
var blue_ball_material = new THREE.MeshLambertMaterial( {color: 0x0000ff} );
var blue_ball = new THREE.Mesh( blue_ball_geo, blue_ball_material );
scene.add( blue_ball );
group.add(blue_ball);
blue_ball.angle = Math.random()* Math.PI*2;

// 綠環
var green_ring_geo = new THREE.RingBufferGeometry( 9.7, 10, 64 );
var green_ring_material = new THREE.MeshLambertMaterial( {color: 0x00ff00, side: THREE.DoubleSide} );
var green_ring = new THREE.Mesh( green_ring_geo, green_ring_material );
scene.add( green_ring );
group.add(green_ring)
// 綠球
var green_ball_geo = new THREE.SphereBufferGeometry( 1, 32, 32);
var green_ball_material = new THREE.MeshLambertMaterial( {color: 0x00ff00} );
var green_ball = new THREE.Mesh( green_ball_geo, green_ball_material );
scene.add( green_ball );
group.add( green_ball);
green_ball.angle = Math.random()* Math.PI*2;

// 紅環
var red_ring_geo = new THREE.RingBufferGeometry( 9.7, 10, 64 );
var red_ring_material = new THREE.MeshLambertMaterial( {color: 0xff0000, side: THREE.DoubleSide} );
var red_ring = new THREE.Mesh( red_ring_geo, red_ring_material );
red_ring.rotation.y = 1.5;
scene.add( red_ring );
group.add(red_ring)

// 紅球
var red_ball_geo = new THREE.SphereBufferGeometry( 1, 32, 32);
var red_ball_material = new THREE.MeshLambertMaterial( {color: 0xff0000} );
var red_ball = new THREE.Mesh( red_ball_geo, red_ball_material );
scene.add( red_ball );
group.add( red_ball);
red_ball.angle = Math.random()* Math.PI*2;

scene.add(group);

// light
  // 環境光，讓每一面都施加光源，直接copy
  var ambientLight = new THREE.AmbientLight("#333")
  scene.add(ambientLight)
  // 平行光，Directional Light，直接copy
  var directionalLight = new THREE.DirectionalLight(0xffffff,0.5)
  scene.add(directionalLight)

  
  // 聚光源，直接copy
  var spotLight = new THREE.SpotLight({color: "#fff"})
  spotLight.position.set(-20,20,10)
  spotLight.CastShadow=true
  scene.add(spotLight)


// // 右上角的光源
// var rightLight = new THREE.DirectionalLight( 0xffffff, 0.5 );
// rightLight.position.set(10, 10, 10  );
// scene.add( rightLight );
// var right_helper = new THREE.DirectionalLightHelper( rightLight, 1 );
// scene.add( right_helper );

// // 左下角的光源
// var leftLight = new THREE.DirectionalLight( 0xffffff, 0.5 );
// leftLight.position.set(-10, -10, -10);
// scene.add( leftLight );
// var left_helper = new THREE.DirectionalLightHelper( leftLight, 1 );
// scene.add( left_helper );



camera.position.z = 25;


var animate = function () {
   requestAnimationFrame( animate );

   // 用滑鼠控制視角，直接copy
   controls.update();

   blue_ball.position.x = 9.7* Math.cos(blue_ball.angle)
   blue_ball.position.z = 9.7 * Math.sin(blue_ball.angle)
   
   green_ball.position.x = 9.7* Math.cos(green_ball.angle)
   green_ball.position.y = 9.7* Math.sin(green_ball.angle)
   
   red_ball.position.y = 9.7* Math.cos(red_ball.angle)
   red_ball.position.z = 9.7* Math.sin(red_ball.angle)

   blue_ball.angle+=0.01;
   green_ball.angle+=0.01;
   red_ball.angle+=0.01;

   // group.rotation.y +=0.01
   // group.rotation.z +=0.01
   renderer.render( scene, camera );
};

animate();


// 視窗重新縮放後，要改變的東西。★可以直接copy
window.addEventListener('resize',function(){
   camera.aspect = window.innerWidth/window.innerHeight
   camera.updateProjectionMatrix()
   renderer.setSize(window.innerWidth-5,window.innerHeight-5)
 })
