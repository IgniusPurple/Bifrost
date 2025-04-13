
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { DollarSign, Lock, User } from "lucide-react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha todos os campos.",
        variant: "destructive",
      });
      return;
    }
    
    setLoading(true);
    
    // Simulating login - would connect to backend in real implementation
    setTimeout(() => {
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("userEmail", email);
      setLoading(false);
      
      toast({
        title: "Login realizado com sucesso",
        description: "Bem-vindo(a) à sua plataforma financeira.",
      });
      
      navigate("/");
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
          <h1 className="text-2xl font-bold text-finance-dark dark:text-white">Finance Toolkit</h1>
          <p className="text-finance-gray dark:text-gray-300 mt-2">
            Entre para acessar suas ferramentas financeiras
          </p>
        </div>
        
        <Card className="p-6 shadow-lg border border-gray-200 dark:border-gray-800 bg-green-50 dark:bg-green-900/20">
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  type="email"
                  placeholder="E-mail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  type="password"
                  placeholder="Senha"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="text-right">
                <Button 
                  variant="link" 
                  className="text-xs p-0 h-auto text-finance-blue"
                  onClick={() => navigate("/recuperar-senha")}
                >
                  Esqueceu sua senha?
                </Button>
              </div>
            </div>
            
            <Button 
              type="submit" 
              className="w-full bg-finance-blue hover:bg-finance-blue/90" 
              disabled={loading}
            >
              {loading ? "Entrando..." : "Entrar"}
            </Button>
            
            <div className="text-center text-sm text-finance-gray dark:text-gray-400">
              Não tem uma conta?{" "}
              <Button 
                variant="link" 
                className="p-0 h-auto text-finance-blue"
                onClick={() => navigate("/criar-conta")}
              >
                Criar conta
              </Button>
            </div>
          </form>
        </Card>
        
        <div className="mt-6 text-center text-sm text-finance-gray dark:text-gray-400">
          © {new Date().getFullYear()} Finance Toolkit. Todos os direitos reservados.
        </div>
      </div>
    </div>
  );
};

export default Login;
