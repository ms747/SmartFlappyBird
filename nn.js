function sigmoid(x) {
    return 1 / (1 + Math.exp(-x));
}

function desigmoid(x) {
    return x * (1 - x);
}

class NeuralNetwork {
    constructor(input_nodes, hidden_nodes, output_nodes) {

        this.input_nodes = input_nodes;
        this.hidden_nodes = hidden_nodes;
        this.output_nodes = output_nodes;

        this.wt_ih = new Matrix(this.hidden_nodes, this.input_nodes);
        this.wt_ho = new Matrix(this.output_nodes, this.hidden_nodes);

        this.wt_ih.randomize();
        this.wt_ho.randomize();

        this.bias_h = new Matrix(this.hidden_nodes, 1);
        this.bias_o = new Matrix(this.output_nodes, 1);

        this.bias_h.randomize();
        this.bias_o.randomize();

        this.learningRate = 0.5;
    }

    train(input_array, target_array) {
        let inputs = Matrix.fromArray(input_array);
        let hidden = Matrix.multiply(this.wt_ih, inputs);
        hidden.add(this.bias_h);
        hidden.map(sigmoid);

        let outputs = Matrix.multiply(this.wt_ho, hidden);
        outputs.add(this.bias_o);
        outputs.map(sigmoid);

        let targets = Matrix.fromArray(target_array);

        let output_errors = Matrix.subtract(targets, outputs)

        let gradients = Matrix.map(outputs, desigmoid);
        gradients.multiply(output_errors);
        gradients.multiply(this.learningRate);

        let hidden_T = Matrix.transpose(hidden);
        let wt_ho_deltas = Matrix.multiply(gradients, hidden_T);

        this.wt_ho.add(wt_ho_deltas);
        this.bias_o.add(gradients);

        let who_t = Matrix.transpose(this.wt_ho);
        let hidden_errors = Matrix.multiply(who_t, output_errors);

        let hidden_gradient = Matrix.map(hidden, desigmoid);
        hidden_gradient.multiply(hidden_errors);
        hidden_gradient.multiply(this.learningRate);

        let input_T = Matrix.transpose(inputs);
        let wt_ih_deltas = Matrix.multiply(hidden_gradient, input_T);

        this.wt_ih.add(wt_ih_deltas);
        this.bias_h.add(hidden_gradient);
    }

    predict(input_array) {
        let inputs = Matrix.fromArray(input_array);
        let hidden = Matrix.multiply(this.wt_ih, inputs);
        hidden.add(this.bias_h);
        hidden.map(sigmoid);

        let output = Matrix.multiply(this.wt_ho, hidden);
        output.add(this.bias_o);
        output.map(sigmoid);

        return output.toArray();
    }

    copy() {
        return new NeuralNetwork(this);
    }

    mutate(func) {
        this.wt_ih.map(func);
        this.wt_ho.map(func);
        this.bias_h.map(func);
        this.bias_o.map(func);
    }
}
