import typescript from '@rollup/plugin-typescript';

const outDir = 'dist';

export default {
  input: 'src/index.ts',
  plugins: [typescript()],
  output: [
    {
      name: 'Pluggin',
      dir: `${outDir}/umd`,
      format: 'umd',
      sourcemap: true,
    },
  ],
};
