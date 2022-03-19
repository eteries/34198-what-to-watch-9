function Loading(): JSX.Element {
  return (
    <div style={{position: 'absolute', width: '100%', height: '100%', display: 'flex'}}>
      <svg xmlns="http://www.w3.org/2000/svg" style={{margin: 'auto'}} width="100" height="100" viewBox="0 0 100 100" overflow="visible"
           fill="#dfcf77">
        <defs>
          <rect id="spinner" x="15" y="45" width="10" height="10" />
        </defs>
        <use xlinkHref="#spinner" transform="rotate(0 50 50)">
          <animate attributeName="opacity" values="0;1;0" dur="1s" begin="0s" repeatCount="indefinite" />
          <animateTransform attributeName="transform" type="translate" additive="sum" dur="1s" begin="0s"
                            repeatCount="indefinite" from="0 0" to="10" />
          <animateTransform attributeName="transform" type="skewX" additive="sum" dur="1s" begin="0s"
                            repeatCount="indefinite" from="0" to="20" />
        </use>
        <use xlinkHref="#spinner" transform="rotate(30 50 50)">
          <animate attributeName="opacity" values="0;1;0" dur="1s" begin="0.08s" repeatCount="indefinite" />
          <animateTransform attributeName="transform" type="translate" additive="sum" dur="1s" begin="0.08s"
                            repeatCount="indefinite" from="0 0" to="10" />
          <animateTransform attributeName="transform" type="skewX" additive="sum" dur="1s" begin="0.08s"
                            repeatCount="indefinite" from="0" to="20" />
        </use>
        <use xlinkHref="#spinner" transform="rotate(60 50 50)">
          <animate attributeName="opacity" values="0;1;0" dur="1s" begin="0.16s" repeatCount="indefinite" />
          <animateTransform attributeName="transform" type="translate" additive="sum" dur="1s" begin="0.16s"
                            repeatCount="indefinite" from="0 0" to="10" />
          <animateTransform attributeName="transform" type="skewX" additive="sum" dur="1s" begin="0.16s"
                            repeatCount="indefinite" from="0" to="20" />
        </use>
        <use xlinkHref="#spinner" transform="rotate(90 50 50)">
          <animate attributeName="opacity" values="0;1;0" dur="1s" begin="0.24s" repeatCount="indefinite" />
          <animateTransform attributeName="transform" type="translate" additive="sum" dur="1s" begin="0.24s"
                            repeatCount="indefinite" from="0 0" to="10" />
          <animateTransform attributeName="transform" type="skewX" additive="sum" dur="1s" begin="0.24s"
                            repeatCount="indefinite" from="0" to="20" />
        </use>
        <use xlinkHref="#spinner" transform="rotate(120 50 50)">
          <animate attributeName="opacity" values="0;1;0" dur="1s" begin="0.32s" repeatCount="indefinite" />
          <animateTransform attributeName="transform" type="translate" additive="sum" dur="1s" begin="0.32s"
                            repeatCount="indefinite" from="0 0" to="10" />
          <animateTransform attributeName="transform" type="skewX" additive="sum" dur="1s" begin="0.32s"
                            repeatCount="indefinite" from="0" to="20" />
        </use>
        <use xlinkHref="#spinner" transform="rotate(150 50 50)">
          <animate attributeName="opacity" values="0;1;0" dur="1s" begin="0.4s" repeatCount="indefinite" />
          <animateTransform attributeName="transform" type="translate" additive="sum" dur="1s" begin="0.4s"
                            repeatCount="indefinite" from="0 0" to="10" />
          <animateTransform attributeName="transform" type="skewX" additive="sum" dur="1s" begin="0.4s"
                            repeatCount="indefinite" from="0" to="20" />
        </use>
        <use xlinkHref="#spinner" transform="rotate(180 50 50)">
          <animate attributeName="opacity" values="0;1;0" dur="1s" begin="0.48s" repeatCount="indefinite" />
          <animateTransform attributeName="transform" type="translate" additive="sum" dur="1s" begin="0.48s"
                            repeatCount="indefinite" from="0 0" to="10" />
          <animateTransform attributeName="transform" type="skewX" additive="sum" dur="1s" begin="0.48s"
                            repeatCount="indefinite" from="0" to="20" />
        </use>
        <use xlinkHref="#spinner" transform="rotate(210 50 50)">
          <animate attributeName="opacity" values="0;1;0" dur="1s" begin="0.56s" repeatCount="indefinite" />
          <animateTransform attributeName="transform" type="translate" additive="sum" dur="1s" begin="0.56s"
                            repeatCount="indefinite" from="0 0" to="10" />
          <animateTransform attributeName="transform" type="skewX" additive="sum" dur="1s" begin="0.56s"
                            repeatCount="indefinite" from="0" to="20" />
        </use>
        <use xlinkHref="#spinner" transform="rotate(240 50 50)">
          <animate attributeName="opacity" values="0;1;0" dur="1s" begin="0.64s" repeatCount="indefinite" />
          <animateTransform attributeName="transform" type="translate" additive="sum" dur="1s" begin="0.64s"
                            repeatCount="indefinite" from="0 0" to="10" />
          <animateTransform attributeName="transform" type="skewX" additive="sum" dur="1s" begin="0.64s"
                            repeatCount="indefinite" from="0" to="20" />
        </use>
        <use xlinkHref="#spinner" transform="rotate(270 50 50)">
          <animate attributeName="opacity" values="0;1;0" dur="1s" begin="0.72s" repeatCount="indefinite" />
          <animateTransform attributeName="transform" type="translate" additive="sum" dur="1s" begin="0.72s"
                            repeatCount="indefinite" from="0 0" to="10" />
          <animateTransform attributeName="transform" type="skewX" additive="sum" dur="1s" begin="0.72s"
                            repeatCount="indefinite" from="0" to="20" />
        </use>
        <use xlinkHref="#spinner" transform="rotate(300 50 50)">
          <animate attributeName="opacity" values="0;1;0" dur="1s" begin="0.8s" repeatCount="indefinite" />
          <animateTransform attributeName="transform" type="translate" additive="sum" dur="1s" begin="0.8s"
                            repeatCount="indefinite" from="0 0" to="10" />
          <animateTransform attributeName="transform" type="skewX" additive="sum" dur="1s" begin="0.8s"
                            repeatCount="indefinite" from="0" to="20" />
        </use>
        <use xlinkHref="#spinner" transform="rotate(330 50 50)">
          <animate attributeName="opacity" values="0;1;0" dur="1s" begin="0.88s" repeatCount="indefinite" />
          <animateTransform attributeName="transform" type="translate" additive="sum" dur="1s" begin="0.88s"
                            repeatCount="indefinite" from="0 0" to="10" />
          <animateTransform attributeName="transform" type="skewX" additive="sum" dur="1s" begin="0.88s"
                            repeatCount="indefinite" from="0" to="20" />
        </use>
      </svg>
    </div>
  );
}

export default Loading;
