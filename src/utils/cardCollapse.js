function calculateCollapsedScale(heightCollapsed, heightExpanded, width) {
  return {
    x: width / width,
    y: heightCollapsed / heightExpanded,
  };
}

function ease(v, pow = 4) {
  return 1 - Math.pow(1 - v, pow);
}

export function createKeyframeAnimation(
  heightCollapsed,
  heightExpanded,
  width
) {
  // Figure out the size of the element when collapsed.
  let { x, y } = calculateCollapsedScale(
    heightCollapsed,
    heightExpanded,
    width
  );
  let animation = "";
  let inverseAnimation = "";

  for (let step = 0; step <= 100; step++) {
    // Remap the step value to an eased one.
    let easedStep = ease(step / 100);

    // Calculate the scale of the element.
    const xScale = x + (1 - x) * easedStep;
    const yScale = y + (1 - y) * easedStep;

    animation += `${step}% {
      transform: scale(${xScale}, ${yScale});
    }`;

    // And now the inverse for the contents.
    const invXScale = 1 / xScale;
    const invYScale = 1 / yScale;
    inverseAnimation += `${step}% {
      transform: scale(${invXScale}, ${invYScale});
    }`;
  }

  return {
    menuAnimation: animation,
    menuContentsAnimation: inverseAnimation,
  };
  //   return `
  //   @keyframes menuAnimation {
  //     ${animation}
  //   }

  //   @keyframes menuContentsAnimation {
  //     ${inverseAnimation}
  //   }`;
}
