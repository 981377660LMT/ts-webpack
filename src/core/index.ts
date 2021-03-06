// 封装了一些常用算法和api
// 图形，材质，光线，相机

import * as THREE from 'three'

import '@/a.scss'
import '../kurisu.png'

const width = 300
const height = 400
const canvas = document.getElementById('canvas') as HTMLCanvasElement

class MyRenderer {
  constructor(
    private camera: THREE.Camera = new THREE.OrthographicCamera(
      -width / 2,
      width / 2,
      height / 2,
      -height / 2,
      -1000,
      1000
    ),
    private mesh: THREE.Mesh = new THREE.Mesh(),
    private renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer({ canvas }),
    private scene: THREE.Scene = new THREE.Scene(),
    private isInit: boolean = false,
    private currentAngle: number = 0
  ) {}

  private initCamera() {
    this.camera.position.x = 0
    this.camera.position.y = 0
    this.camera.position.z = 0
    this.camera.lookAt(new THREE.Vector3(0, 0, 1))
  }

  private initRenderer() {
    this.renderer.setClearColor(new THREE.Color(0, 0, 0))
    this.renderer.setSize(400, 400)
  }

  private initMesh() {
    const triangleShape = new THREE.Shape()
    triangleShape.moveTo(0, 100)
    triangleShape.lineTo(-100, -100)
    triangleShape.lineTo(100, -100)
    triangleShape.lineTo(0, 100)
    const geometry = new THREE.ShapeGeometry(triangleShape)
    const material = new THREE.MeshBasicMaterial({
      color: 0xff0000,
      side: THREE.DoubleSide,
    })

    this.mesh = new THREE.Mesh(geometry, material)
    this.mesh.position.x = 0
    this.mesh.position.y = 0
    this.mesh.position.z = 1
  }

  private initScene() {
    this.scene.add(this.mesh)
  }

  private initAll() {
    this.initCamera()
    this.initRenderer()
    this.initMesh()
    this.initScene()
    return this
  }

  render() {
    this.initAll()
    this.renderer.render(this.scene, this.camera)
    this.isInit = true
    return this
  }

  rotate() {
    if (!this.isInit) {
      throw Error('需要先初始化')
    }

    this.currentAngle += 0.001
    this.mesh.rotation.set(0, 0, this.currentAngle)
    this.renderer.render(this.scene, this.camera)
    requestAnimationFrame(this.rotate.bind(this))
    return this
  }
}

const myRenderer = new MyRenderer()
myRenderer.render().rotate()
