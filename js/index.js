let container = document.querySelector('#container');

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );

// 用滑鼠控制視角，直接copy
var controls = new THREE.OrbitControls( camera );


var group = new THREE.Object3D()
var blue_group = new THREE.Object3D()
var green_group = new THREE.Object3D()
var red_group = new THREE.Object3D()
var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
container.appendChild( renderer.domElement );

// 中間的球
var geometry = new THREE.SphereBufferGeometry( 1, 32, 32 );
var material = new THREE.MeshLambertMaterial( {color: 0xc9c9c9});
var center = new THREE.Mesh( geometry, material );
// scene.add( center );

// 藍環
var blue_ring_geo = new THREE.TorusBufferGeometry( 10, 0.1, 2, 100 ); // 使用 Torus 環面！
var blue_ring_material = new THREE.MeshLambertMaterial( {color: "#00f", side: THREE.DoubleSide} );
var blue_ring = new THREE.Mesh( blue_ring_geo, blue_ring_material );
// blue_ring.rotation.x = Math.PI/2;
blue_group.add(blue_ring);


// 藍球
var blue_ball_geo = new THREE.SphereBufferGeometry( 1, 32, 32);
var blue_ball_material = new THREE.MeshLambertMaterial( {color: 0x0000ff} );
var blue_ball = new THREE.Mesh( blue_ball_geo, blue_ball_material );
blue_ball.angle = Math.random()* Math.PI*2;
blue_group.add(blue_ball);

// 藍環+藍球 放入場景裡
scene.add( blue_group );

// 綠環
var green_ring_geo = new THREE.TorusBufferGeometry( 10, 0.1, 2, 100 );
var green_ring_material = new THREE.MeshLambertMaterial( {color: 0x00ff00, side: THREE.DoubleSide} );
var green_ring = new THREE.Mesh( green_ring_geo, green_ring_material );
green_ring.name="green ring"
green_group.add(green_ring);
// 旋轉後，物體的x,y,z 軸也會跟著旋轉
// green_ring.rotation.x = Math.PI/2;
// green_ring.rotation.y = -Math.PI/3;

// scene.add( green_ring );
// group.add(green_ring)

// 綠球
var green_ball_geo = new THREE.SphereBufferGeometry( 1, 32, 32);
var green_ball_material = new THREE.MeshLambertMaterial( {color: 0x00ff00} );
var green_ball = new THREE.Mesh( green_ball_geo, green_ball_material );
green_ball.angle = Math.random()* Math.PI*2;
green_ball.name="green_ball"

green_group.add(green_ball);

// 綠環+綠球 放入場景裡
scene.add( green_group );

// 紅環
var red_ring_geo = new THREE.TorusBufferGeometry( 10, 0.1, 2, 100 );
var red_ring_material = new THREE.MeshLambertMaterial( {color: 0xff0000, side: THREE.DoubleSide} );
var red_ring = new THREE.Mesh( red_ring_geo, red_ring_material );
red_ring.name="red ring"
red_group.add(red_ring);
// red_ring.rotation.y = 1.5;
// scene.add( red_ring );

// 紅球
var red_ball_geo = new THREE.SphereBufferGeometry( 1, 32, 32);
var red_ball_material = new THREE.MeshLambertMaterial( {color: 0xff0000} );
var red_ball = new THREE.Mesh( red_ball_geo, red_ball_material );
red_ball.angle = Math.random()* Math.PI*2;
red_ring.name="red ball"
red_group.add(red_ball);

// 紅環+紅球 放入場景裡
scene.add(red_group);

// light
  // 環境光，讓每一面都施加光源，直接copy
  var ambientLight = new THREE.AmbientLight("#333")
  scene.add(ambientLight)
  // 平行光，Directional Light，直接copy
  var directionalLight = new THREE.DirectionalLight(0xffffff,1)
  scene.add(directionalLight)

  
  // 聚光源，直接copy
  var spotLight = new THREE.SpotLight({color: "#fff"})
  spotLight.position.set(-20,20,10)
  spotLight.CastShadow=true
  scene.add(spotLight)

// 聚光源 Helper
//   var slh = new THREE.SpotLightHelper( spotLight );
//   scene.add(slh);



camera.position.z = 25;

blue_group.rotation.x = Math.PI/2;

green_group.rotation.x = Math.PI/2;
green_group.rotation.y = -Math.PI/3;

red_group.rotation.x = Math.PI/2;
red_group.rotation.y = Math.PI/3;
// red_group.rotation.z = -Math.PI/6;

var animate = function () {
   requestAnimationFrame( animate );

   // 用滑鼠控制視角，直接copy
   controls.update();

   blue_ball.position.x = 9.7* Math.cos(blue_ball.angle)
   blue_ball.position.y = 9.7 * Math.sin(blue_ball.angle)
   
   green_ball.position.x = 9.7* Math.cos(green_ball.angle)
   green_ball.position.y = 9.7* Math.sin(green_ball.angle)
   
   red_ball.position.x = 9.7* Math.cos(red_ball.angle)
   red_ball.position.y = 9.7* Math.sin(red_ball.angle)

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
