import { useState } from "react";
import { Send, Bot, User, Lightbulb, FileText, Phone, Mail } from "lucide-react";
import { Header } from "@/components/layout/header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChatMessage } from "@/domain/types";

const quickPrompts = [
  {
    icon: Mail,
    title: "Draft Follow-up Email",
    description: "Create a personalized follow-up email for a lead",
    prompt: "Help me write a follow-up email for a warm lead who hasn't responded in 2 weeks"
  },
  {
    icon: Phone,
    title: "Call Script",
    description: "Generate talking points for a sales call",
    prompt: "Create a call script for reaching out to a new lead in the SaaS industry"
  },
  {
    icon: FileText,
    title: "Lead Analysis",
    description: "Analyze lead behavior and suggest next steps",
    prompt: "Analyze this lead's engagement and suggest the best approach for conversion"
  },
  {
    icon: Lightbulb,
    title: "Strategy Advice",
    description: "Get strategic advice for your sales pipeline",
    prompt: "What's the best strategy to nurture cold leads in my pipeline?"
  },
];

export default function Assistant() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      content: "Hello! I'm your AI sales assistant. I can help you with lead analysis, email drafting, call preparation, and strategic advice. What would you like to work on today?",
      role: "assistant",
      timestamp: new Date(),
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async (message?: string) => {
    const messageToSend = message || inputValue.trim();
    if (!messageToSend) return;

    // Add user message
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      content: messageToSend,
      role: "user",
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: getAIResponse(messageToSend),
        role: "assistant", 
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsLoading(false);
    }, 1500);
  };

  const getAIResponse = (userMessage: string): string => {
    // Simple mock responses based on keywords
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes("email") || lowerMessage.includes("follow-up")) {
      return `Here's a follow-up email template you can customize:

**Subject: Following up on our conversation**

Hi [Lead Name],

I hope this email finds you well. I wanted to follow up on our previous conversation about [specific topic/pain point discussed].

I understand that [acknowledge their situation/challenge]. Based on what you shared, I believe our [solution/product] could help you [specific benefit].

Would you be open to a brief 15-minute call this week to discuss how we can help you achieve [their goal]? I have some availability on [specific times].

Looking forward to hearing from you.

Best regards,
[Your name]

Would you like me to customize this further for a specific lead?`;
    }
    
    if (lowerMessage.includes("call") || lowerMessage.includes("script")) {
      return `Here's a call script structure for your sales call:

**Opening (30 seconds)**
- "Hi [Name], this is [Your name] from [Company]. How are you doing today?"
- "I'm calling because [specific reason - referral, downloaded content, etc.]"

**Discovery Questions (5-7 minutes)**
- "Tell me about your current challenges with [their industry problem]"
- "What solutions have you tried before?"
- "What would an ideal solution look like for you?"

**Value Proposition (2-3 minutes)**
- Connect their needs to your solution
- Share a relevant case study or result

**Next Steps (1-2 minutes)**
- "Based on what you've shared, I think a quick demo would be valuable"
- "When would be a good time for a 20-minute call?"

Remember to listen more than you talk! Would you like me to customize this for a specific industry or lead?`;
    }
    
    if (lowerMessage.includes("strategy") || lowerMessage.includes("nurture")) {
      return `Here's a strategy for nurturing cold leads:

**1. Segmentation First**
- Group leads by industry, company size, or pain points
- Tailor your approach for each segment

**2. Value-First Approach**
- Share industry insights, case studies, or useful resources
- Don't pitch immediately - build trust first

**3. Multi-Touch Sequence**
- Week 1: Educational content (blog post, whitepaper)
- Week 3: Case study relevant to their industry
- Week 5: Soft check-in with valuable insight
- Week 7: Direct but helpful follow-up

**4. Personalization is Key**
- Reference their company news or achievements
- Connect your solution to their specific challenges

**5. Track and Optimize**
- Monitor open rates and engagement
- A/B test different approaches

Would you like me to help you create a specific nurture sequence for your cold leads?`;
    }
    
    return `I'd be happy to help you with that! Could you provide more specific details about:

- Which lead you're working with
- What specific challenge you're facing
- What outcome you're hoping to achieve

The more context you provide, the better I can tailor my assistance to your needs. You can also try one of the quick prompts above for common sales scenarios.`;
  };

  const handleQuickPrompt = (prompt: string) => {
    setInputValue(prompt);
  };

  return (
    <div className="flex-1 overflow-hidden">
      <Header 
        title="AI Assistant" 
        description="Get intelligent insights and assistance for your sales activities."
      />

      <div className="flex h-full">
        {/* Chat Area */}
        <div className="flex-1 flex flex-col">
          {/* Messages */}
          <ScrollArea className="flex-1 p-6">
            <div className="space-y-6 max-w-4xl mx-auto">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex items-start space-x-3 ${
                    message.role === "user" ? "flex-row-reverse space-x-reverse" : ""
                  }`}
                >
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className={
                      message.role === "user" 
                        ? "bg-primary text-primary-foreground" 
                        : "bg-accent text-accent-foreground"
                    }>
                      {message.role === "user" ? (
                        <User className="h-4 w-4" />
                      ) : (
                        <Bot className="h-4 w-4" />
                      )}
                    </AvatarFallback>
                  </Avatar>

                  <div className={`flex-1 ${message.role === "user" ? "text-right" : ""}`}>
                    <div
                      className={`inline-block max-w-[80%] p-4 rounded-lg ${
                        message.role === "user"
                          ? "bg-primary text-primary-foreground"
                          : "gradient-card card-shadow"
                      }`}
                    >
                      <div className="whitespace-pre-wrap text-sm">
                        {message.content}
                      </div>
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      {message.timestamp.toLocaleTimeString()}
                    </div>
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex items-start space-x-3">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-accent text-accent-foreground">
                      <Bot className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="gradient-card card-shadow p-4 rounded-lg">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-pulse"></div>
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-pulse" style={{ animationDelay: "0.2s" }}></div>
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-pulse" style={{ animationDelay: "0.4s" }}></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

          {/* Input Area */}
          <div className="border-t border-border p-6">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center space-x-4">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ask me anything about your leads, sales strategy, or need help with emails..."
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  className="flex-1"
                />
                <Button 
                  onClick={() => handleSendMessage()}
                  disabled={!inputValue.trim() || isLoading}
                  className="gradient-primary glow"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Prompts Sidebar */}
        <div className="w-80 border-l border-border bg-card p-6">
          <h3 className="font-semibold text-foreground mb-4">Quick Actions</h3>
          <div className="space-y-3">
            {quickPrompts.map((prompt, index) => (
              <Card 
                key={index}
                className="cursor-pointer transition-smooth hover:card-shadow-lg gradient-card border-0"
                onClick={() => handleQuickPrompt(prompt.prompt)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start space-x-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <prompt.icon className="h-4 w-4 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-sm text-foreground">
                        {prompt.title}
                      </h4>
                      <p className="text-xs text-muted-foreground mt-1">
                        {prompt.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-6 pt-6 border-t border-border">
            <h4 className="font-medium text-sm text-foreground mb-3">Tips</h4>
            <div className="space-y-2 text-xs text-muted-foreground">
              <div className="flex items-center space-x-2">
                <Badge variant="secondary" className="text-xs">Tip</Badge>
                <span>Be specific about your lead or situation</span>
              </div>
              <div className="flex items-center space-x-2">
                <Badge variant="secondary" className="text-xs">Tip</Badge>
                <span>Ask for templates, scripts, or strategies</span>
              </div>
              <div className="flex items-center space-x-2">
                <Badge variant="secondary" className="text-xs">Tip</Badge>
                <span>Request industry-specific advice</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}