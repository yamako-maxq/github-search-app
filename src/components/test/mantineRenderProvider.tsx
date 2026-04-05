
import { MantineProvider } from "@mantine/core";
import "@testing-library/jest-dom";
import { render } from "@testing-library/react";

export default function MantineRenderProvider(ui: React.ReactNode) {
    return render(
        <MantineProvider>
            {ui}
        </MantineProvider>
    );
};