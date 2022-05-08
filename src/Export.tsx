import './Export.css';
import { PassedSchema } from 'graphql-editor/lib/Models';

export const Export = () => {

  function generateDataURI( data: string ): string {
      const blobType = 'text/plain;charset=utf-8'
      return URL.createObjectURL(new Blob([data], { type: blobType }))
  }

  function download( data: string, fileName: string = "schema.gql" ): void {
      const dataURI = generateDataURI(data)
      const anchor = document.createElement('a')
      anchor.href = dataURI

      anchor.download = fileName
      anchor.setAttribute('style', 'visibility:hidden')
      document.body.appendChild(anchor)
      anchor.dispatchEvent(
      new MouseEvent('click', {
        bubbles: false,
        cancelable: false,
        view: window,
       }),
      )
      document.body.removeChild(anchor)
  }

  function handleExportClick() {
        const gqlEditorSchema: string | null = localStorage.getItem('gqlEditorSchema');
        if(gqlEditorSchema) {
            const {code} = JSON.parse(gqlEditorSchema) as PassedSchema
            console.info(code)
            download(code)
        } else {
            console.error("load schema error")
        }
  }

  return (
      <div 
        style={{
            position: "absolute",
            bottom: "10px",
            left: "10px",
            zIndex: 100
        }}>
        <a onClick={handleExportClick} >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" className='svgIcon' >
            <path d="M13.328 12.88H2.664v.96h10.664v-.96zM7.096 3.008L2.672 7.432l.904.904L7.36 4.552v7.208h1.28V4.552l3.784 3.784.904-.904-4.424-4.424L8 2.104l-.904.904z"></path>
          </svg>
        </a>
      </div>
  );
};

export default Export;