import Main from '../main/main';

type AppProps = {
  movie: {
    name: string,
    genre: string,
    released: number
  }
}

function App({movie}: AppProps): JSX.Element {
  return <Main name={movie.name} genre={movie.genre} released={movie.released} />;
}

export default App;
