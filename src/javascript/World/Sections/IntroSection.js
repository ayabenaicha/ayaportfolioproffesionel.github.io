import * as THREE from 'three'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js'
export default class IntroSection {
    constructor(_options) {
        // Options
        this.config = _options.config
        this.time = _options.time
        this.resources = _options.resources
        this.objects = _options.objects
        this.areas = _options.areas
        this.walls = _options.walls
        this.tiles = _options.tiles
        this.debug = _options.debug
        this.x = _options.x
        this.y = _options.y

        // Set up
        this.container = new THREE.Object3D()
        this.container.matrixAutoUpdate = false
        this.container.updateMatrix()

        this.setStatic()
        this.setInstructions()
        this.setOtherInstructions()
        this.setTitles()
        this.setTiles()
        this.setDikes()
        // Initialize the cubes
        
     
        
    }

    setStatic() {
        this.objects.add({
            base: this.resources.items.introStaticBase.scene,
            collision: this.resources.items.introStaticCollision.scene,
            floorShadowTexture: this.resources.items.introStaticFloorShadowTexture,
            offset: new THREE.Vector3(0, 0, 0),
            mass: 0
        })
    }

    setInstructions() {
        this.instructions = {}

        /**
         * Arrows
         */
        this.instructions.arrows = {}

        // Label
        this.instructions.arrows.label = {}

        this.instructions.arrows.label.texture = this.config.touch ? this.resources.items.introInstructionsControlsTexture : this.resources.items.introInstructionsArrowsTexture
        this.instructions.arrows.label.texture.magFilter = THREE.NearestFilter
        this.instructions.arrows.label.texture.minFilter = THREE.LinearFilter

        this.instructions.arrows.label.material = new THREE.MeshBasicMaterial({ transparent: true, alphaMap: this.instructions.arrows.label.texture, color: 0xffffff, depthWrite: false, opacity: 0 })

        this.instructions.arrows.label.geometry = this.resources.items.introInstructionsLabels.scene.children.find((_mesh) => _mesh.name === 'arrows').geometry

        this.instructions.arrows.label.mesh = new THREE.Mesh(this.instructions.arrows.label.geometry, this.instructions.arrows.label.material)
        this.container.add(this.instructions.arrows.label.mesh)

        if (!this.config.touch) {
            // Keys
            this.instructions.arrows.up = this.objects.add({
                base: this.resources.items.introArrowKeyBase.scene,
                collision: this.resources.items.introArrowKeyCollision.scene,
                offset: new THREE.Vector3(0, 0, 0),
                rotation: new THREE.Euler(0, 0, 0),
                duplicated: true,
                shadow: { sizeX: 1, sizeY: 1, offsetZ: - 0.2, alpha: 0.5 },
                mass: 1.5,
                soundName: 'brick'
            })
            this.instructions.arrows.down = this.objects.add({
                base: this.resources.items.introArrowKeyBase.scene,
                collision: this.resources.items.introArrowKeyCollision.scene,
                offset: new THREE.Vector3(0, - 0.8, 0),
                rotation: new THREE.Euler(0, 0, Math.PI),
                duplicated: true,
                shadow: { sizeX: 1, sizeY: 1, offsetZ: - 0.2, alpha: 0.5 },
                mass: 1.5,
                soundName: 'brick'
            })
            this.instructions.arrows.left = this.objects.add({
                base: this.resources.items.introArrowKeyBase.scene,
                collision: this.resources.items.introArrowKeyCollision.scene,
                offset: new THREE.Vector3(- 0.8, - 0.8, 0),
                rotation: new THREE.Euler(0, 0, Math.PI * 0.5),
                duplicated: true,
                shadow: { sizeX: 1, sizeY: 1, offsetZ: - 0.2, alpha: 0.5 },
                mass: 1.5,
                soundName: 'brick'
            })
            this.instructions.arrows.right = this.objects.add({
                base: this.resources.items.introArrowKeyBase.scene,
                collision: this.resources.items.introArrowKeyCollision.scene,
                offset: new THREE.Vector3(0.8, - 0.8, 0),
                rotation: new THREE.Euler(0, 0, - Math.PI * 0.5),
                duplicated: true,
                shadow: { sizeX: 1, sizeY: 1, offsetZ: - 0.2, alpha: 0.5 },
                mass: 1.5,
                soundName: 'brick'
            })
        }
    }
    

    setOtherInstructions() {
        if (this.config.touch) {
            return
        }

        this.otherInstructions = {}
        this.otherInstructions.x = 16
        this.otherInstructions.y = - 2

        // Container
        this.otherInstructions.container = new THREE.Object3D()
        this.otherInstructions.container.position.x = this.otherInstructions.x
        this.otherInstructions.container.position.y = this.otherInstructions.y
        this.otherInstructions.container.matrixAutoUpdate = false
        this.otherInstructions.container.updateMatrix()
        this.container.add(this.otherInstructions.container)

        // Label
        this.otherInstructions.label = {}

        this.otherInstructions.label.geometry = new THREE.PlaneGeometry(6, 6, 1, 1)

        this.otherInstructions.label.texture = this.resources.items.introInstructionsOtherTexture
        this.otherInstructions.label.texture.magFilter = THREE.NearestFilter
        this.otherInstructions.label.texture.minFilter = THREE.LinearFilter

        this.otherInstructions.label.material = new THREE.MeshBasicMaterial({ transparent: true, alphaMap: this.otherInstructions.label.texture, color: 0xffffff, depthWrite: false, opacity: 0 })

        this.otherInstructions.label.mesh = new THREE.Mesh(this.otherInstructions.label.geometry, this.otherInstructions.label.material)
        this.otherInstructions.label.mesh.matrixAutoUpdate = false
        this.otherInstructions.container.add(this.otherInstructions.label.mesh)

        // Horn
        this.otherInstructions.horn = this.objects.add({
            base: this.resources.items.hornBase.scene,
            collision: this.resources.items.hornCollision.scene,
            offset: new THREE.Vector3(this.otherInstructions.x + 1.25, this.otherInstructions.y - 2.75, 0.2),
            rotation: new THREE.Euler(0, 0, 0.5),
            duplicated: true,
            shadow: { sizeX: 1.65, sizeY: 0.75, offsetZ: - 0.1, alpha: 0.4 },
            mass: 1.5,
            soundName: 'horn',
            sleep: false
        })
    }
    setTitles() {
        const loader = new FontLoader();
        const fontPath = 'https://threejs.org/examples/fonts/helvetiker_regular.typeface.json';

        loader.load(fontPath, (font) => {
            const textOptions = {
                font: font,
                size: 1.5,
                height: 0.3,
                curveSegments: 12,
                bevelEnabled: true,
                bevelThickness: 0.03,
                bevelSize: 0.05,
                bevelSegments: 5,
            };

            const materialGradient = new THREE.ShaderMaterial({
                uniforms: {
                    color1: { value: new THREE.Color(0xe0e0e0) },
                    color2: { value: new THREE.Color(0xffffff) },
                },
                vertexShader: `
                    varying vec3 vPosition;
                    void main() {
                        vPosition = position;
                        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                    }
                `,
                fragmentShader: `
                    uniform vec3 color1;
                    uniform vec3 color2;
                    varying vec3 vPosition;
                    void main() {
                        float mixValue = (vPosition.y + 1.0) / 2.0;
                        vec3 finalColor = mix(color1, color2, mixValue);
                        gl_FragColor = vec4(finalColor, 1.0);
                    }
                `,
                side: THREE.DoubleSide,
            });

            const nameText = new TextGeometry('AYA BEN AICHA', textOptions);
            const nameMesh = new THREE.Mesh(nameText, materialGradient);

            nameMesh.position.set(-9.4, -8.9, 0);
            nameMesh.rotation.set(Math.PI / 2, 0, 0);

            nameMesh.castShadow = false;
            nameMesh.receiveShadow = false;

            this.container.add(nameMesh);
        });

         // Ajout pour "Creative Web" et "Dev Base"
    this.objects.add({
        base: this.resources.items.introCreativeBase.scene,
        collision: this.resources.items.introCreativeCollision.scene,
        offset: new THREE.Vector3(0, 0, 0),
        rotation: new THREE.Euler(0, 0, 0.25),
        shadow: { sizeX: 5, sizeY: 1.5, offsetZ: -0.6, alpha: 0.3 },
        mass: 1.5,
        sleep: false,
        soundName: 'brick',
    });

    this.objects.add({
        base: this.resources.items.introDevBase.scene,
        collision: this.resources.items.introDevCollision.scene,
        offset: new THREE.Vector3(0, 0, 0),
        rotation: new THREE.Euler(0, 0, 0),
        shadow: { sizeX: 2.5, sizeY: 1.5, offsetZ: -0.6, alpha: 0.3 },
        mass: 1.5,
        soundName: 'brick',
    });
        this.addGirlImage(); // Ajouter la fille après le texte
        this.addViolinImage(); // Ajouter le violon à côté ou ailleurs
        this.addBookImage();  // Ajouter le livre
        this.addFloatingCubes(); // Ajouter les deux cubes flottants

    }
    // Fonction pour créer un cube personnalisé
createTexturedCube(textArray, position, rotationSpeed, colorArray) {
    const cubeSize = 2;
    const cubeGeometry = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);
    
    const cubeMaterials = textArray.map((text, index) => {
        const canvas = document.createElement('canvas');
        canvas.width = 256;
        canvas.height = 256;
        const context = canvas.getContext('2d');
        
        // Background color for each face (from the color array)
        context.fillStyle = colorArray[index] || '#FFFFFF'; // default white if not specified
        context.fillRect(0, 0, canvas.width, canvas.height);
        
        // Text on each face
        context.font = '48px Arial';
        context.fillStyle = '#000000'; // Text color
        context.textAlign = 'center';
        context.textBaseline = 'middle';
        context.fillText(text, canvas.width / 2, canvas.height / 2);
        
        const texture = new THREE.CanvasTexture(canvas);
        return new THREE.MeshBasicMaterial({ map: texture });
    });

    const cube = new THREE.Mesh(cubeGeometry, cubeMaterials);
    
    // Position the cube
    cube.position.set(position.x, position.y, position.z);

    // Add rotation animation
    this.time.on('tick', () => {
        cube.rotation.x += rotationSpeed.x;
        cube.rotation.y += rotationSpeed.y;
        cube.rotation.z += rotationSpeed.z;
    });

    // Add the cube to the scene
    this.container.add(cube);
}

addFloatingCubes() {
    const firstCubeTexts = [
        'Skills', 'HTML/CSS', 'JAVASCRIPT', 'JAVA', 
        'PYTHON', 'LARAVEL', 'REACTJS', 'SPRINGBOOT'
    ];

    const secondCubeTexts = [
        'Skills', 'ANGULAR', 'DART/FLUTTER', 'GIT', 
        'Docker', 'Prisma', 'Remix', 'NodeJS'
    ];

    const colorsForFirstCube = [
        '#FFC0CB', '#FFB6C1', '#FF69B4', '#FF1493',
        '#DB7093', '#C71585', '#E0B0FF', '#D8BFD8'
    ];

    const colorsForSecondCube = [
        '#ADD8E6', '#87CEEB', '#4682B4', '#B0E0E6',
        '#5F9EA0', '#AFEEEE', '#B0C4DE', '#6495ED'
    ];

    // Position of cubes
    const firstCubePosition = new THREE.Vector3(14, -64, 0.8);
    const secondCubePosition = new THREE.Vector3(10, -64, 0.9);

    // Speed of rotation for the cubes (adjust as necessary)
    const rotationSpeed = new THREE.Vector3(0.01, 0.01, 0.01);

    // Create the first cube
    this.createTexturedCube(firstCubeTexts, firstCubePosition, rotationSpeed, colorsForFirstCube);

    // Create the second cube
    this.createTexturedCube(secondCubeTexts, secondCubePosition, rotationSpeed, colorsForSecondCube);
}

    addGirlImage() {
        const textureLoader = new THREE.TextureLoader();
    
        const girlTexture = textureLoader.load(
            '../models/area/dev.webp',  // Chemin relatif
            function (texture) {
                console.log('Texture loaded successfully');
            },
            undefined,
            function (err) {
                console.error('Error loading texture', err);
            }
        );
    
        const girlGeometry = new THREE.PlaneGeometry(3, 5); // Ajuster selon l'image
        const girlMaterial = new THREE.MeshBasicMaterial({
            map: girlTexture,
            transparent: true,  // Pour la transparence
        });
    
        const girlMesh = new THREE.Mesh(girlGeometry, girlMaterial);
    
        girlMesh.position.set(9, -12, 2); // Ajuster selon la scène
        
        // Rotation pour faire pivoter l'image de π/2 autour de l'axe Z
        girlMesh.rotation.x = Math.PI / 2;
    
        // Ajouter le mesh à la scène
        this.container.add(girlMesh);
    }
    
    
    addViolinImage() {
        const textureLoader = new THREE.TextureLoader();
    
        // Charger l'image du violon
        const violinTexture = textureLoader.load(
            '../models/area/violon.png',  // Chemin relatif à l'image du violon
            function (texture) {
                console.log('Violin texture loaded successfully');
            },
            undefined,
            function (err) {
                console.error('Error loading violin texture', err);
            }
        );
    
        const violinGeometry = new THREE.PlaneGeometry(3, 5); // Ajuster selon la taille de l'image
        const violinMaterial = new THREE.MeshBasicMaterial({
            map: violinTexture,
            transparent: true,  // Pour la transparence si l'image est un PNG ou autre
        });
    
        const violinMesh = new THREE.Mesh(violinGeometry, violinMaterial);
    
        violinMesh.position.set(-0.1, -29.1, 4); // Ajuster la position pour la scène
        
        // Rotation pour faire pivoter l'image si nécessaire
        violinMesh.rotation.x = Math.PI / 2; // Rotation pour placer verticalement si besoin
        violinMesh.rotation.z = 0.3; 
        // Ajouter le mesh à la scène
        this.container.add(violinMesh);
    }
    
    
    
    addBookImage() {
        const textureLoader = new THREE.TextureLoader();
    
        // Charger l'image du livre
        const bookTexture = textureLoader.load(
            '../models/area/ayo.png',  // Chemin relatif à l'image du livre
            function (texture) {
                console.log('Book texture loaded successfully');
            },
            undefined,
            function (err) {
                console.error('Error loading book texture', err);
            }
        );
    
        const bookGeometry = new THREE.PlaneGeometry(2, 3); // Ajuster selon la taille de l'image
        const bookMaterial = new THREE.MeshBasicMaterial({
            map: bookTexture,
            transparent: true,  // Pour la transparence si l'image est un PNG ou autre
        });
    
        const bookMesh = new THREE.Mesh(bookGeometry, bookMaterial);
    
        bookMesh.position.set(1.8, -28.9, 2.1); // Ajuster la position pour la scène
        
        // Rotation pour faire pivoter l'image si nécessaire
        bookMesh.rotation.x = Math.PI / 2; // Rotation pour placer verticalement si besoin
        
        // Ajouter le mesh à la scène
        this.container.add(bookMesh);
    }
    
    
    
    
    
    
    
    setTiles() {
        this.tiles.add({
            start: new THREE.Vector2(0, - 4.5),
            delta: new THREE.Vector2(0, - 4.5)
        })
    }


   
    setDikes() {
        this.dikes = {}
        this.dikes.brickOptions = {
            base: this.resources.items.brickBase.scene,
            collision: this.resources.items.brickCollision.scene,
            offset: new THREE.Vector3(0, 0, 0.1),
            rotation: new THREE.Euler(0, 0, 0),
            duplicated: true,
            shadow: { sizeX: 1.2, sizeY: 1.8, offsetZ: - 0.15, alpha: 0.35 },
            mass: 0.5,
            soundName: 'brick'
        }

        // this.walls.add({
        //     object:
        //     {
        //         ...this.dikes.brickOptions,
        //         rotation: new THREE.Euler(0, 0, Math.PI * 0.5)
        //     },
        //     shape:
        //     {
        //         type: 'brick',
        //         equilibrateLastLine: true,
        //         widthCount: 3,
        //         heightCount: 2,
        //         position: new THREE.Vector3(this.x + 0, this.y - 4, 0),
        //         offsetWidth: new THREE.Vector3(1.05, 0, 0),
        //         offsetHeight: new THREE.Vector3(0, 0, 0.45),
        //         randomOffset: new THREE.Vector3(0, 0, 0),
        //         randomRotation: new THREE.Vector3(0, 0, 0.2)
        //     }
        // })

        this.walls.add({
            object: this.dikes.brickOptions,
            shape:
            {
                type: 'brick',
                equilibrateLastLine: true,
                widthCount: 5,
                heightCount: 2,
                position: new THREE.Vector3(this.x - 12, this.y - 13, 0),
                offsetWidth: new THREE.Vector3(0, 1.05, 0),
                offsetHeight: new THREE.Vector3(0, 0, 0.45),
                randomOffset: new THREE.Vector3(0, 0, 0),
                randomRotation: new THREE.Vector3(0, 0, 0.2)
            }
        })

        this.walls.add({
            object:
            {
                ...this.dikes.brickOptions,
                rotation: new THREE.Euler(0, 0, Math.PI * 0.5)
            },
            shape:
            {
                type: 'brick',
                equilibrateLastLine: true,
                widthCount: 3,
                heightCount: 2,
                position: new THREE.Vector3(this.x + 8, this.y + 6, 0),
                offsetWidth: new THREE.Vector3(1.05, 0, 0),
                offsetHeight: new THREE.Vector3(0, 0, 0.45),
                randomOffset: new THREE.Vector3(0, 0, 0),
                randomRotation: new THREE.Vector3(0, 0, 0.2)
            }
        })

        this.walls.add({
            object: this.dikes.brickOptions,
            shape:
            {
                type: 'brick',
                equilibrateLastLine: false,
                widthCount: 3,
                heightCount: 2,
                position: new THREE.Vector3(this.x + 9.9, this.y + 4.7, 0),
                offsetWidth: new THREE.Vector3(0, - 1.05, 0),
                offsetHeight: new THREE.Vector3(0, 0, 0.45),
                randomOffset: new THREE.Vector3(0, 0, 0),
                randomRotation: new THREE.Vector3(0, 0, 0.2)
            }
        })

        this.walls.add({
            object:
            {
                ...this.dikes.brickOptions,
                rotation: new THREE.Euler(0, 0, Math.PI * 0.5)
            },
            shape:
            {
                type: 'brick',
                equilibrateLastLine: true,
                widthCount: 3,
                heightCount: 2,
                position: new THREE.Vector3(this.x - 14, this.y + 2, 0),
                offsetWidth: new THREE.Vector3(1.05, 0, 0),
                offsetHeight: new THREE.Vector3(0, 0, 0.45),
                randomOffset: new THREE.Vector3(0, 0, 0),
                randomRotation: new THREE.Vector3(0, 0, 0.2)
            }
        })

        this.walls.add({
            object: this.dikes.brickOptions,
            shape:
            {
                type: 'brick',
                equilibrateLastLine: false,
                widthCount: 3,
                heightCount: 2,
                position: new THREE.Vector3(this.x - 14.8, this.y + 0.7, 0),
                offsetWidth: new THREE.Vector3(0, - 1.05, 0),
                offsetHeight: new THREE.Vector3(0, 0, 0.45),
                randomOffset: new THREE.Vector3(0, 0, 0),
                randomRotation: new THREE.Vector3(0, 0, 0.2)
            }
        })

        this.walls.add({
            object: this.dikes.brickOptions,
            shape:
            {
                type: 'brick',
                equilibrateLastLine: true,
                widthCount: 3,
                heightCount: 2,
                position: new THREE.Vector3(this.x - 14.8, this.y - 3.5, 0),
                offsetWidth: new THREE.Vector3(0, - 1.05, 0),
                offsetHeight: new THREE.Vector3(0, 0, 0.45),
                randomOffset: new THREE.Vector3(0, 0, 0),
                randomRotation: new THREE.Vector3(0, 0, 0.2)
            }
        })

        if (!this.config.touch) {
            this.walls.add({
                object:
                {
                    ...this.dikes.brickOptions,
                    rotation: new THREE.Euler(0, 0, Math.PI * 0.5)
                },
                shape:
                {
                    type: 'brick',
                    equilibrateLastLine: true,
                    widthCount: 2,
                    heightCount: 2,
                    position: new THREE.Vector3(this.x + 18.5, this.y + 3, 0),
                    offsetWidth: new THREE.Vector3(1.05, 0, 0),
                    offsetHeight: new THREE.Vector3(0, 0, 0.45),
                    randomOffset: new THREE.Vector3(0, 0, 0),
                    randomRotation: new THREE.Vector3(0, 0, 0.2)
                }
            })

            this.walls.add({
                object: this.dikes.brickOptions,
                shape:
                {
                    type: 'brick',
                    equilibrateLastLine: false,
                    widthCount: 2,
                    heightCount: 2,
                    position: new THREE.Vector3(this.x + 19.9, this.y + 2.2, 0),
                    offsetWidth: new THREE.Vector3(0, - 1.05, 0),
                    offsetHeight: new THREE.Vector3(0, 0, 0.45),
                    randomOffset: new THREE.Vector3(0, 0, 0),
                    randomRotation: new THREE.Vector3(0, 0, 0.2)
                }
            })
        }
    }
}
