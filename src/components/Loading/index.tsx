import './style.css';

interface LoadingProps {
  text?: string;
}

export function Loading({ text = 'Carregando...' }: LoadingProps) {
  return (
    <div className="loading-background">
      <div className="loading">
        <div className="loading__spinner"></div>
        <p className="loading__text">{text}</p>
      </div>
    </div>
  );
}
