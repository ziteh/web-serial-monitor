import { useRouter } from "./context/router";
import { SerialPortManager } from "./lib/serialport";
import ScriptsPage from "./pages/scripts";
import TerminalPage from "./pages/terminal";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./components/ui/dialog";

export default function App() {
  const { currentRoute } = useRouter();

  return (
    <>
      {currentRoute === "/" && <TerminalPage />}
      {currentRoute === "/page2" && <ScriptsPage />}

      {/* Check if Web Serial API is supported */}
      <Dialog open={!SerialPortManager.isSupported}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>🚫 Error</DialogTitle>
            <DialogDescription>
              <p className="my-4">
                This browser does not support the{" "}
                <strong>Web Serial API</strong>
              </p>
              <p>
                For more information on browser compatibility, please visit the
                following link:
              </p>
              <a
                href="https://developer.mozilla.org/en-US/docs/Web/API/Web_Serial_API#browser_compatibility"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: "#1a73e8",
                  textDecoration: "underline",
                  marginTop: "0.5rem",
                  display: "inline-block",
                }}
              >
                Web Serial API Browser Compatibility
              </a>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
}
