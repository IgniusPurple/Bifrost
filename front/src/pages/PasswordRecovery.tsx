
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { DollarSign, Mail, ArrowLeft } from "lucide-react";

const PasswordRecovery = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleRecovery = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast({
        title: "Campo obrigatório",
        description: "Por favor, informe seu e-mail cadastrado.",
        variant: "destructive",
      });
      return;
    }
    
    setLoading(true);
    
    // Simulating API call
    setTimeout(() => {
      setLoading(false);
      setSent(true);
      
      toast({
        title: "Instruções enviadas",
        description: "Verifique seu e-mail para redefinir sua senha.",
      });
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:from-gray-900 dark:to-gray-800 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="h-16 w-16 rounded-full bg-finance-blue flex items-center justify-center">
              <DollarSign className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-finance-dark dark:text-white">Biofrost</h1>
          <p className="text-finance-gray dark:text-gray-300 mt-2">
            Recuperação de senha
          </p>
        </div>
        
        <Card className="p-6 shadow-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
          {!sent ? (
            <form onSubmit={handleRecovery} className="space-y-6">
              <p className="text-sm text-finance-gray dark:text-gray-300">
                Digite o e-mail associado à sua conta e enviaremos instruções para redefinir sua senha.
              </p>
              
              <div className="space-y-2">
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    type="email"
                    placeholder="E-mail"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-finance-blue hover:bg-finance-blue/90" 
                disabled={loading}
              >
                {loading ? "Enviando..." : "Enviar instruções"}
              </Button>
              
              <div className="text-center">
                <Button 
                  type="button" 
                  variant="ghost" 
                  className="text-sm text-finance-gray hover:text-finance-blue"
                  onClick={() => navigate("/login")}
                >
                  <ArrowLeft className="h-4 w-4 mr-1" />
                  Voltar para o login
                </Button>
              </div>
            </form>
          ) : (
            <div className="space-y-6 text-center">
              <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                <p className="text-green-700 dark:text-green-400">
                  E-mail enviado com sucesso!
                </p>
                <p className="text-sm text-finance-gray dark:text-gray-400 mt-2">
                  Verifique sua caixa de entrada e siga as instruções para redefinir sua senha.
                </p>
              </div>
              
              <Button 
                type="button" 
                variant="outline" 
                className="w-full"
                onClick={() => navigate("/login")}
              >
                <ArrowLeft className="h-4 w-4 mr-1" />
                Voltar para o login
              </Button>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default PasswordRecovery;
