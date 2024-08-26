import { useState } from 'react'

function Versions(): JSX.Element {
  const [versions] = useState(window.electron.process.versions)
  const NPM_PACKAGE_VERSION = __APP_VERSION__

  return (
    <ul className="versions">
      <li className="electron-version">Electron v{versions.electron}</li>
      <li className="chrome-version">Chromium v{versions.chrome}</li>
      <li className="node-version">Node v{versions.node}</li>
      <li>{NPM_PACKAGE_VERSION}</li>
    </ul>
  )
}

export default Versions
