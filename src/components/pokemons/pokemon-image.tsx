/* eslint-disable qwik/jsx-img */

import { component$, useSignal, useTask$ } from "@builder.io/qwik";

interface Props {
  id: number;
  size?: number;
  backImage: boolean;
  isVisible?: boolean;
}

export const PokemonImage = component$(({
  id,
  size = 200,
  backImage = false,
  isVisible = true
}: Props) => {

  const imageLoaded = useSignal(false);

  useTask$(({ track }) => {
    track(() => id);
    imageLoaded.value = false;
  });
  

  let urlBase = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`

  if (backImage) {
    urlBase = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/${id}.png`
  }

  return (
    <div class="flex items-center justify-center" style={{ width: `${ size}px`, height: `${ size }px`}}>

      { !imageLoaded.value && (<span>Cargando... </span>) }

      <img src={`${backImage ? urlBase : urlBase}`}
        alt="Pokemon Sprite"
        style={{ width: `${size}px` }}
        onLoad$={() => {
          // setTimeout(() => {
            imageLoaded.value = true
          // }, 2000);
        }}
        class={[{ 'hidden': !imageLoaded.value, 'brightness-0': isVisible }, 'transition-all duration-1000']}

      />
    </div>
  );
});