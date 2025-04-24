
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { DollarSign, Mail, User, Lock, ArrowLeft, CheckSquare } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

const CreateAccount = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleCreateAccount = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validações básicas
    if (!name || !email || !password || !confirmPassword) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha todos os campos.",
        variant: "destructive",
      });
      return;
    }
    
    if (password !== confirmPassword) {
      toast({
        title: "Senhas não conferem",
        description: "A senha e a confirmação devem ser iguais.",
        variant: "destructive",
      });
      return;
    }
    
    if (!acceptTerms) {
      toast({
        title: "Termos não aceitos",
        description: "Você precisa aceitar os termos para criar uma conta.",
        variant: "destructive",
      });
      return;
    }
    
    setLoading(true);
    
    // Simulating account creation
    setTimeout(() => {
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("userEmail", email);
      localStorage.setItem("userName", name);
      setLoading(false);
      
      toast({
        title: "Conta criada com sucesso",
        description: "Bem-vindo(a) à sua plataforma financeira.",
      });
      
      navigate("/");
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:from-gray-900 dark:to-gray-800 p-4">
      <div className="w-full max-w-md py-8">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="h-16 w-16 rounded-full bg-finance-blue flex items-center justify-center">
              <DollarSign className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-finance-dark dark:text-white">Biofrost</h1>
          <p className="text-finance-gray dark:text-gray-300 mt-2">
            Crie sua conta para começar
          </p>
        </div>
        
        <Card className="p-6 shadow-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
          <form onSubmit={handleCreateAccount} className="space-y-5">
            <div>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Nome completo"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <div>
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
            
            <div>
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
            </div>
            
            <div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  type="password"
                  placeholder="Confirme sua senha"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <div className="flex items-start space-x-2">
              <Checkbox 
                id="terms" 
                checked={acceptTerms}
                onCheckedChange={(checked) => setAcceptTerms(checked as boolean)}
              />
              <div className="grid gap-1.5 leading-none">
                <Label
                  htmlFor="terms"
                  className="text-sm text-gray-600 dark:text-gray-300 leading-tight"
                >
                  Eu li e aceito os <Button variant="link" className="h-auto p-0 text-finance-blue">Termos de Uso</Button> e a <Button variant="link" className="h-auto p-0 text-finance-blue">Política de Privacidade</Button>
                </Label>
              </div>
            </div>
            
            <Button 
              type="submit" 
              className="w-full bg-finance-blue hover:bg-finance-blue/90" 
              disabled={loading}
            >
              {loading ? "Criando conta..." : "Criar conta"}
            </Button>
            
            <div className="text-center text-sm text-finance-gray dark:text-gray-400">
              Já tem uma conta?{" "}
              <Button 
                variant="link" 
                className="p-0 h-auto text-finance-blue"
                onClick={() => navigate("/login")}
              >
                Entrar
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default CreateAccount;
