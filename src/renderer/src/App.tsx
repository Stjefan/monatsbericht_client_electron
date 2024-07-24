import { useState } from 'react'
import Versions from './components/Versions'
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
// import electronLogo from './assets/electron.svg'
const REPORT_URL = import.meta.env.VITE_PROJECTS_URL
const NPM_PACKAGE_VERSION = __APP_VERSION__
function App(): JSX.Element {
  
  const projects = [
    "Mannheim", "Immendingen"
  ]

  const years = [2024, 2025, 2026, 2027, 2028]

  const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]


  // const ipcHandle = (): void => window.electron.ipcRenderer.send('ping')

  // const ipcHandleDirectorySelector = (): void => window.electron.ipcRenderer.send('openDirectory')

  async function download(filename: string) {
    const t1 = toast.info("Erstellung wurde gestartet", {
      autoClose: false,
    });
    
    try {
      
      
      
      const response = await fetch(
        // "https://api.api-ninjas.com/v1/loremipsum?paragraphs=2"
        `https://kufi-immissionsschutz-azure-function.azurewebsites.net/api/default_report?project=${project.toLowerCase()}&year=${year}&month=${month}`
        //`http://localhost:7071/api/default_report?project=${project.toLowerCase()}&year=${year}&month=${month}`
      )
      
      console.log('response', response)
      toast.success("Erstellung erfolgreich");
      response.blob().then(blob => {
        console.log('blob', blob)
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
    // element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    link.setAttribute('download', filename);

    link.style.display = 'none';
    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);
      })
    } catch (error) {
      toast.error("Es ist ein Fehler aufgetreten");
      console.error('Error:', error);
      
    } finally {
      toast.done(t1)
    }
    if (false) {
    
    }
}

function getReport() {
  console.log('getReport', year, month, project)
  download(`${project}_${year.toString()}_${month.toString().padStart(2, '0')}.xlsx`)

}

  const [year, setYear] = useState(new Date().getFullYear())
  const [month, setMonth] = useState(new Date().getMonth() + 1)
  const [project, setProject] = useState(projects[0])

  return (
    <>
    <ToastContainer />
    <div>Monatsberichte erstellen</div>
    <div>Version: {NPM_PACKAGE_VERSION}</div>
      <div>URL: {REPORT_URL}</div>
      <select value={project} onChange={e => setProject(e.target.value)}>{projects.map(i => <option key={i}>{i}</option>)}</select>
      <select value={year} onChange={e => setYear(Number.parseInt(e.target.value))}>{years.map(i => <option key={i}>{i}</option>)}</select>

      <select value={month} onChange={e => setMonth(Number.parseInt(e.target.value))}>{months.map(i => <option key={i}>{i}</option>)}</select>

      <div className="actions">
        <div className="action">
          {/* <a target="_blank" rel="noreferrer" onClick={ipcHandle}>
            Send IPC
          </a>
          <a target="_blank" rel="noreferrer" onClick={ipcHandleDirectorySelector}>
            Bericht erstellen
          </a> */}
          {/* <a target='_blank' rel='noreferrer' onClick={() => {
             toast("Wow so easy!");
             console.log('toast')
          }}>
            DOIT </a> */}
          <a target='_blank' rel='noreferrer' onClick={getReport}>
            Bericht erstellen
            </a>
        </div>
      </div>
      <Versions></Versions>
    </>
  )
}

export default App
