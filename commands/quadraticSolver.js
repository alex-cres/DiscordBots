module.exports = {
    name: 'quadsolver',
    args: 'a b c',
    description: 'solves a quadratic equation',
    argsDescription: {
        "a": "the a component of the equation",
        "b": "the b component of the equation",
        "c": "the c component of the equation",
    },
    execute(message, args,client,result) {
        const a = args.shift();
        const b = args.shift();
        const c = args.shift();
        
        if (a == undefined || b == undefined || c == undefined || isNaN(a) || isNaN(b) || isNaN(c)) {
            result += "└► quadratic solver needs a valid a, b and c to solve the equation"+ "\n";
        } else {
            result += ("├► quadratic solver arguments: a= " + a + " , b= " + b + " , c= " + c)+ "\n";
            const descri = b * b - 4 * a * c;
            result += ("├► (b^2 - 4ac)=" + descri + " " + ((descri > 0) ? " there are two real solutions" : ((descri == 0) ? "there is only one solution" : "there are complex solutions")))+ "\n";
            if (descri >= 0) {
                const x1 = (-b + Math.sqrt(descri)) / (2 * a);
                const x2 = (-b - Math.sqrt(descri)) / (2 * a);
                result += ((descri > 0) ? ("└► solutions: x1= " + x1 + " , x2= " + x2) : ("├► solution: x= " + x1)) + "\n";

            } else {
                const x1 = ((-b) / (2 * a)) + " + " + (Math.sqrt(-descri) / (2 * a)) + " i";
                const x2 = ((-b) / (2 * a)) + " - " + (Math.sqrt(-descri) / (2 * a)) + " i";
                result += ("└► solutions: x1= " + x1 + " , x2= " + x2)  + "\n";
            }
        }
        return result;
    }

}