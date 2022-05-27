from django.http import QueryDict
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.authtoken.serializers import AuthTokenSerializer
from knox.auth import AuthToken
from .serializers import RegisterSerializer
from .mlmodle import make_it


@api_view(['POST'])
def login_api(request):
    serializer = AuthTokenSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)

    user = serializer.validated_data['user']

    is_created, token = AuthToken.objects.create(user)

    return Response({
        'user_info': {
            'id': user.id,
            'username': user.username,
            'email': user.email
        },
        'token': token,
        'status': 200,
    })


@api_view(['GET'])
def get_user_data(request):
    user = request.user

    if user.is_authenticated:
        return Response(
            {
                "status":200,
                'user_info': {
                    'id': user.id,
                    'username': user.username,
                    'email': user.email,

                }
            }
        )

    return Response({'error': 'Not Authenticated'}, status=401)

@api_view(['POST'])
def register_api(request):
    serializer = RegisterSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)

    user = serializer.save()
    _, token = AuthToken.objects.create(user)

    return Response(
        {
            'user_info': {
                'id': user.id,
                'username': user.username,
                'email': user.email,

            },
            'token': token,
            'status':201,
        }
    )

questions_dict = {
    1: 'How good are you in memorizing?',
    2: 'Rate yourself at socializing.',
    3: 'Your will of taking the risk of pursuing a unexplored career.',
    4: 'Rate yourself for your destructive(toys) nature in your childhood.',
    5: 'How will you rate yourself for interest in coding or programming ?',
    6: 'Your level of interest in statistics and probability.',
    7: 'If 0 represent short length movies and 10 represent long length movies , rate your choice of  movie.',
    8: 'How was your third language(sanskrit or any new language) in school ?',
    9: 'Rate you designing(can say drawing) skills.',
    10: 'What will be the level of your interest in creating the product over selling the product?',
    11: 'How interested are you in learning till you work in industry?',
    12: 'If 0 represent simplicity and 10 represent chaos , rate yourself in this category of life you want.',
    13: 'Your level of interest in sales and marketing.',
    14: 'How was your maths in your 11th and 12th?',
}

@api_view(['GET'])
def get_questions_api(request):
    user = request.user

    if user.is_authenticated:
        return Response(
            {
                'status': 200,
                'user_info': {
                    'id': user.id,
                    'username': user.username,
                    'email': user.email,

                },
                'questions':questions_dict,
            }
        )
    return Response({
        'status': 400,
        'error': 'Not authorized to access',
    })

def predictor(response_dict):
    answers = []
    for que, ans in response_dict.items():
        answers.append(int(ans))
    predicted_results = make_it(answers)
    return predicted_results

@api_view(['POST'])
def post_questions_api(request):
    user = request.user
    if user.is_authenticated:
        dict1 = QueryDict.dict(request.data)
        results = predictor(dict1)
        print(user, results, sep=": ")
    
    return Response({'status': 200, "results": results})



