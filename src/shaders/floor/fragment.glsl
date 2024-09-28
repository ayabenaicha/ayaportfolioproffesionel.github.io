uniform sampler2D tBackground;

varying vec2 vUv;

void main()
{
    vec4 backgroundColor = texture(tBackground, vUv);
    
    if (backgroundColor.a == 0.0)  // Si aucune texture de fond n'est trouvée, on utilise la couleur rose.
    {
        backgroundColor = vec4(1.0, 0.75, 0.8, 1.0);  // Couleur rose (R, G, B, A)
    }

    gl_FragColor = backgroundColor;
}
