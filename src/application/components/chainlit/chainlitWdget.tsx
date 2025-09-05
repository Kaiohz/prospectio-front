import { useEffect, useState } from "react";
import { chatbotService } from "../../../infrastructure/services/chatbot.service";


/**
 * Component that handles mounting the Chainlit widget after the app has loaded
 * and token is available.
 * 
 * @returns {null} The component doesn't render any visible elements
 */
const ChainlitWidget = () => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        if (mounted) return;

        chatbotService.loadWidget()
            .then(() => setMounted(true))
    }, [mounted]);

    return null;
};

export default ChainlitWidget;