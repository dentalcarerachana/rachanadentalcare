//database
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var FeedbackSchema = new Schema({
    created: {
        type: Date,
        default: Date.now
    },
    feedbackPatName: {
        type: String,
        default: '',
        trim: true,
        required: 'Please fill your  Patinet Name', 
    },
    feedbackDoctorName: {
        type: String,
        default: '',
        trim: true,
        required: 'Please fill your  Doctor Name',
    },
    feedbackNatureTreatment: {
        type: String,
        default: '',
        trim: true,
        required: 'Please fill your  Doctor Name',
    },
    feedbackAmbience: {
        type: String,
        required: 'Please fill your Ambience',
    },
    feedbackExperience: {
        type: String,
        required: 'Please fill your Experience',
    },
    feedbackHyegine: {
        type: String,
        required: 'Please fill your Hyegine',
    },
    feedbackHandling: {
        type: String,
        required: 'Please fill your Handling',
    },
    feedbackManners: {
        type: String,
        required: 'Please fill your Manners',
    },
    feedbackCommunication: {
        type: String,
        required: 'Please fill your Manners',
    },

    feedbackExplainProblemPlan: {
        type: String,
        required: 'Please fill your ProlemPlan',
    },
    feedbackTreatmentExplainClearly: {
        type: String,required: 'Please fill ExplainClearly',
    },
    feedbackSatisfiedTreatment: {
        type: String,
        required: 'Please fill SatisfiedTreament',
    },
    feedbackRecomendClinic: {
        type: String,
        required: 'Please fill RecomendedClinic',
    },
    feedbackSuggestionImprovement: {
        type: String,
        default: '',
        trim: true,
        required: 'Please fill SuggestionImprovement',
    },
    feedbackRating: {
        type: String,
        default: '',
        trim: true,
        required: 'Please give rating',
    }
   
});

mongoose.model('Feedback', FeedbackSchema);   
