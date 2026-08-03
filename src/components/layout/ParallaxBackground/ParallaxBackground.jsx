import fundo from '../../../assets/images/background.jpg';

function ParallaxBackground({ image = fundo, children }) {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${image})` }}
      />
      <div
        className="absolute inset-0"
        style={{ backgroundColor: 'rgba(19, 15, 42, 0.70)' }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}

export default ParallaxBackground;