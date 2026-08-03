import fundo from '../../../assets/images/background.jpg';

function ParallaxBackground() {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${fundo})` }}
      />
      <div
        className="absolute inset-0"
        style={{ backgroundColor: 'rgba(19, 15, 42, 0.70)' }}
      />
    </div>
  );
}

export default ParallaxBackground;